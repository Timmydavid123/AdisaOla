import React, { useEffect, useState } from 'react';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import type { CustomerData } from '../types/index';
import '../App.css';

const Confirmation: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState<any>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Verify payment and send email receipt
    const verifyPaymentAndSendReceipt = async () => {
      if (sessionId) {
        try {
          // Verify payment with backend
          const verificationResponse = await fetch(`http://localhost:4242/verify-payment?session_id=${sessionId}`);
          const session = await verificationResponse.json();

          if (session.payment_status === 'paid') {
            // Get order data from localStorage or location state
            const pendingOrder = localStorage.getItem('pendingOrder');
            const order = pendingOrder ? JSON.parse(pendingOrder) : location.state;

            if (order) {
              setOrderData(order);

              // Send email receipt
              await fetch('http://localhost:4242/send-receipt', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  customerEmail: order.customer.email,
                  orderId: `ORD-${Date.now()}`,
                  items: order.items,
                  total: order.total,
                  customerName: order.customer.name,
                  shippingAddress: order.customer.address
                }),
              });

              setIsEmailSent(true);
              
              // Clear pending order
              localStorage.removeItem('pendingOrder');
            }
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
        }
      }
    };

    verifyPaymentAndSendReceipt();
  }, [sessionId, location.state]);

  return (
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-content">
          <div className="confirmation-icon">✓</div>
          <h2>Thank You for Your Purchase!</h2>
          <p>Your order has been confirmed. {isEmailSent ? 'An email receipt has been sent to your email address.' : 'Sending email receipt...'}</p>
          
          {orderData?.customer && (
            <div className="customer-details">
              <h3>Order Details</h3>
              <p><strong>Name:</strong> {orderData.customer.name}</p>
              <p><strong>Email:</strong> {orderData.customer.email}</p>
              <p><strong>Shipping Address:</strong> {orderData.customer.address}, {orderData.customer.city}, {orderData.customer.zip}</p>
              <p><strong>Order Total:</strong> ${orderData.total.toFixed(2)}</p>
            </div>
          )}
          
          <Link to="/" className="back-to-shop">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;