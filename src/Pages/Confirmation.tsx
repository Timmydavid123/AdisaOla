import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import type { CustomerData } from '../types';
import '../App.css';

const Confirmation: React.FC = () => {
  const location = useLocation();
  const { customer } = location.state as { customer?: CustomerData } || {};

  return (
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-content">
          <div className="confirmation-icon">✓</div>
          <h2>Thank You for Your Purchase!</h2>
          <p>Your order has been confirmed. You will receive an email confirmation shortly.</p>
          
          {customer && (
            <div className="customer-details">
              <h3>Order Details</h3>
              <p><strong>Name:</strong> {customer.name}</p>
              <p><strong>Email:</strong> {customer.email}</p>
              <p><strong>Shipping Address:</strong> {customer.address}, {customer.city}, {customer.zip}</p>
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