import express, { Request, Response } from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config();
const app = express();
const port = process.env.PORT || 4242;

// Initialize Stripe with proper error handling
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required');
}   

const stripe = new Stripe(stripeSecretKey);

// Email transporter - corrected method name
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Define proper TypeScript interfaces
interface CartItem {
  title: string;
  price: number;
  quantity: number;
}

interface CreateCheckoutSessionRequest {
  items: CartItem[];
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
  currency: string;
  currencyMultiplier: number;
}

interface SendReceiptRequest {
  customerEmail: string;
  orderId: string;
  items: CartItem[];
  total: number;
  customerName: string;
  shippingAddress: string;
}

app.post('/create-checkout-session', async (req: Request<object, object, CreateCheckoutSessionRequest>, res: Response) => {
  try {
    const { items, customerEmail, successUrl, cancelUrl, currency, currencyMultiplier } = req.body;

    // Validate that the currency is supported by Stripe
    const supportedCurrencies = ['USD', 'GBP', 'EUR', 'CAD', 'AUD', 'NGN'];
    const stripeCurrency = supportedCurrencies.includes(currency) ? currency : 'USD';

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
      price_data: {
        currency: stripeCurrency,
        product_data: {
          name: item.title,
        },
        unit_amount: Math.round(item.price * currencyMultiplier), // Convert to smallest unit
      },
      quantity: item.quantity,
    }));

    // Add shipping cost (convert $10 to target currency)
    const shippingRates = {
      USD: 10,
      GBP: 7.9,  // $10 * 0.79
      NGN: 15000, // $10 * 1500
    };
    
    const shippingAmount = shippingRates[stripeCurrency as keyof typeof shippingRates] || 10;
    
    lineItems.push({
      price_data: {
        currency: stripeCurrency,
        product_data: { 
          name: 'Shipping',
          description: 'Standard shipping fee'
        },
        unit_amount: Math.round(shippingAmount * currencyMultiplier),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerEmail,
      success_url: successUrl,
      cancel_url: cancelUrl,
      locale: 'auto',
      metadata: {
        customer_email: customerEmail,
        items_count: items.length.toString(),
        original_currency: currency
      }
    });

    res.json({ id: session.id, url: session.url });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Stripe session creation error:', error);
    res.status(500).json({ error: errorMessage });
  }
});

app.get('/verify-payment', async (req: Request, res: Response) => {
  try {
    const { session_id } = req.query;

    if (!session_id || typeof session_id !== 'string') {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['payment_intent']
    });

    res.json({
      id: session.id,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      customer_email: session.customer_email,
      metadata: session.metadata
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Payment verification error:', error);
    res.status(500).json({ error: errorMessage });
  }
});

app.post('/send-receipt', async (req: Request<object, object, SendReceiptRequest>, res: Response) => {
  try {
    const { customerEmail, orderId, items, total, customerName, shippingAddress } = req.body;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email configuration is missing');
    }

    // Email to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: `Order Confirmation - ${orderId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; text-align: center; }
            .order-details { background: #fff; padding: 20px; border: 1px solid #ddd; }
            .item { border-bottom: 1px solid #eee; padding: 10px 0; }
            .total { font-weight: bold; font-size: 18px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank you for your order, ${customerName}!</h1>
            </div>
            <div class="order-details">
              <p><strong>Order ID:</strong> ${orderId}</p>
              <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
              
              <h3>Order Summary:</h3>
              ${items.map((item) => `
                <div class="item">
                  <p><strong>${item.title}</strong> - $${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
              `).join('')}
              
              <div class="total">
                <p><strong>Total: $${total.toFixed(2)}</strong></p>
              </div>
              
              <h3>Shipping Information:</h3>
              <p><strong>Address:</strong> ${shippingAddress}</p>
              
              <p>Your order will be processed and shipped within 2-3 business days.</p>
              <p>If you have any questions, please contact our support team.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Email to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `New Order Received - ${orderId}`,
      html: `
        <h2>New order received!</h2>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
        <p><strong>Shipping Address:</strong> ${shippingAddress}</p>
        <p><strong>Items:</strong> ${items.length} items</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(customerMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.json({ 
      success: true, 
      message: 'Receipts sent successfully',
      orderId: orderId
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Email sending error:', error);
    res.status(500).json({ error: errorMessage });
  }
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Only serve static files in production
// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'dist')));
  
  // Catch-all for React Router
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});