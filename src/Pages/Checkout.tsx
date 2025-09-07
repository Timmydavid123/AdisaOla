import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CustomerData } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import Header from './Header';
import '../App.css';

const Checkout: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { formatPrice, convertToUSD, getStripeCurrency, getCurrencyMultiplier } = useCurrency();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<string>('stripe');
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate('/shop');
    }
  };

  const shippingCost = cartItems.length > 0 ? 10 : 0;
  const orderTotal = getCartTotal() + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData(prev => ({ ...prev, [name]: value }));
  };

  const redirectToStripe = async (): Promise<void> => {
    if (!customerData.name || !customerData.email || !customerData.address) {
      alert('Please fill in all required customer information');
      return;
    }

    setIsProcessing(true);

    try {
      // Convert all prices to USD for Stripe consistency
      const itemsForStripe = cartItems.map(item => ({
        title: item.title,
        price: convertToUSD(item.price), // Convert to USD
        quantity: item.quantity,
        image: item.image,
        artist: item.artist
      }));

      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: itemsForStripe,
          customerEmail: customerData.email,
          successUrl: `${window.location.origin}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/checkout?canceled=true`,
          currency: getStripeCurrency(), // Send the Stripe currency code
          currencyMultiplier: getCurrencyMultiplier() // Send the multiplier
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create Stripe session');
      }

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received');
      }
      
    } catch (error) {
      console.error('Stripe redirect failed:', error);
      alert('Failed to initiate Stripe payment. Please try again.');
      setIsProcessing(false);
    }
  };

  const redirectToPayPal = async (): Promise<void> => {
    // PayPal implementation remains the same
    await new Promise(resolve => setTimeout(resolve, 1000));
    simulatePaymentSuccess();
  };

  const simulatePaymentSuccess = (): void => {
    const soldItems = JSON.parse(localStorage.getItem('soldItems') || '{}');
    cartItems.forEach(item => {
      soldItems[item.id] = true;
    });
    localStorage.setItem('soldItems', JSON.stringify(soldItems));
    clearCart();
    localStorage.removeItem('pendingOrder');
    
    navigate('/confirmation', {
      state: {
        customer: customerData,
        paymentMethod: selectedPayment,
        orderTotal: orderTotal,
        orderId: `ORD-${Date.now()}`
      }
    });
  };

  const handleSubmitOrder = async () => {
    if (selectedPayment === 'stripe') {
      await redirectToStripe();
    } else if (selectedPayment === 'paypal') {
      await redirectToPayPal();
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate('/shop')} className="continue-shopping">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Header />
      <div className="container">
        <div className="breadcrumb">
          <button 
            onClick={handleGoBack} 
            className="go-back-btn text-sm text-blue-600 hover:underline mb-4"
          >
            ← Go Back
          </button>
          <span className="ml-2 text-gray-600"> / Checkout</span>
        </div>
        <h2>Checkout</h2>
        
        <div className="checkout-content">
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cartItems.map(item => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p>By {item.artist}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="item-price">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
            
            <div className="checkout-total">
              <div className="checkout-total-row">
                <span>Subtotal:</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              <div className="checkout-total-row">
                <span>Shipping:</span>
                <span>{formatPrice(shippingCost)}</span>
              </div>
              <div className="checkout-total-row grand-total">
                <span>Total:</span>
                <span>{formatPrice(orderTotal)}</span>
              </div>
            </div>
          </div>
          
          <div className="checkout-form-container">
            <div className="customer-info-form">
              <h3>Customer Information</h3>
              
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={customerData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={customerData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Shipping Address *</label>
                <input
                  type="text"
                  name="address"
                  value={customerData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={customerData.city}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={customerData.zip}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="payment-methods">
              <h3>Select Payment Method</h3>
              <div className="payment-options">
                <div 
                  className={`payment-option ${selectedPayment === 'stripe' ? 'selected' : ''}`}
                  onClick={() => setSelectedPayment('stripe')}
                >
                  <div className="payment-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path fill="#6772E5" d="M10.5 9.5h3.5v5H10.5z"/>
                      <path fill="#6772E5" d="M16.5 9.5H20v5h-3.5z"/>
                      <path fill="#6772E5" d="M4.5 9.5H8v5H4.5z"/>
                    </svg>
                    <span>Stripe</span>
                  </div>
                  <div className="payment-check">
                    {selectedPayment === 'stripe' && <div className="checkmark">✓</div>}
                  </div>
                </div>
                
                <div 
                  className={`payment-option ${selectedPayment === 'paypal' ? 'selected' : ''}`}
                  onClick={() => setSelectedPayment('paypal')}
                >
                  <div className="payment-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path fill="#003087" d="M7.2 18.2c-.1 0-.2 0-.3-.1l-1.5-1.1-1.1 1.5c-.1.1-.2.2-.4.2H2.5c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h1.5c.2 0 .3.1.4.2l1.1 1.5 1.5-1.1c.1-.1.2-.1.3-.1h1.5c.3 0 .5.2.5.5v3c0 .3-.2.5-.5.5H7.2z"/>
                      <path fill="#003087" d="M21.5 18.2h-1.5c-.1 0-.2 0-.3-.1l-1.5-1.1-1.1 1.5c-.1.1-.2.2-.4.2h-1.5c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h1.5c.2 0 .3.1.4.2l1.1 1.5 1.5-1.1c.1-.1.2-.1.3-.1h1.5c.3 0 .5.2.5.5v3c0 .3-.2.5-.5.5z"/>
                      <path fill="#009CDE" d="M12.5 18.2h-1.5c-.1 0-.2 0-.3-.1l-1.5-1.1-1.1 1.5c-.1.1-.2.2-.4.2H6.5c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5H8c.2 0 .3.1.4.2l1.1 1.5 1.5-1.1c.1-.1.2-.1.3-.1h1.5c.3 0 .5.2.5.5v3c0 .3-.2.5-.5.5z"/>
                      <path fill="#012169" d="M17.5 18.2H16c-.1 0-.2 0-.3-.1l-1.5-1.1-1.1 1.5c-.1.1-.2.2-.4.2h-1.5c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h1.5c.2 0 .3.1.4.2l1.1 1.5 1.5-1.1c.1-.1.2-.1.3-.1h1.5c.3 0 .5.2.5.5v3c0 .3-.2.5-.5.5z"/>
                    </svg>
                    <span>PayPal</span>
                  </div>
                  <div className="payment-check">
                    {selectedPayment === 'paypal' && <div className="checkmark">✓</div>}
                  </div>
                </div>
              </div>
              
              <div className="payment-info">
                {selectedPayment === 'stripe' && (
                  <div className="payment-method-details">
                    <p>Pay securely using your credit or debit card. You'll be redirected to Stripe to complete your payment.</p>
                    <div className="card-icons">
                      <span className="card-icon">💳</span>
                      <span className="card-icon">🔄</span>
                      <span className="card-icon">🔒</span>
                    </div>
                  </div>
                )}
                
                {selectedPayment === 'paypal' && (
                  <div className="payment-method-details">
                    <p>Pay quickly and securely with your PayPal account. You'll be redirected to PayPal to complete your payment.</p>
                    <div className="paypal-benefits">
                      <span>Fast checkout</span>
                      <span>Buyer protection</span>
                      <span>No card needed</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button 
              className={`payment-button ${selectedPayment}`}
              onClick={handleSubmitOrder}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="loading-spinner"></span>
                  <span>Redirecting to {selectedPayment === 'stripe' ? 'Stripe' : 'PayPal'}...</span>
                </>
              ) : (
                <span>
                  {selectedPayment === 'stripe' ? 'Pay with Stripe' : 'Pay with PayPal'} - {formatPrice(orderTotal)}
                </span>
              )}
            </button>

            <div className="security-notice">
              <div className="lock-icon">🔒</div>
              <p>Your payment information is secure. We use {selectedPayment === 'stripe' ? 'Stripe' : 'PayPal'} for secure payment processing.</p>
            </div>
          </div>
          <p className="copyright">© 2025 Adisa Olashile. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;