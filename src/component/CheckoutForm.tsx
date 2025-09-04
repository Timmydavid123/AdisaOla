import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import type { CustomerData } from '../types';
import '../App.css';

interface CheckoutFormProps {
  onSubmit: (customerData: CustomerData) => void;
  isProcessing: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, isProcessing }) => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(customerData);
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h3>Customer Information</h3>
      
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={customerData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={customerData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Shipping Address</label>
        <input
          type="text"
          name="address"
          value={customerData.address}
          onChange={handleChange}
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
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>ZIP Code</label>
          <input
            type="text"
            name="zip"
            value={customerData.zip}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <h3>Payment Details</h3>
      
      <div className="form-group">
        <label>Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={customerData.cardNumber}
          onChange={handleChange}
          placeholder="XXXX XXXX XXXX XXXX"
          required
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Expiration Date</label>
          <input
            type="text"
            name="expDate"
            value={customerData.expDate}
            onChange={handleChange}
            placeholder="MM/YY"
            required
          />
        </div>
        
        <div className="form-group">
          <label>CVV</label>
          <input
            type="text"
            name="cvv"
            value={customerData.cvv}
            onChange={handleChange}
            placeholder="XXX"
            required
          />
        </div>
      </div>
      
      <button 
        type="submit" 
        className="submit-order-btn"
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Complete Purchase'}
      </button>
    </form>
  );
};

export default CheckoutForm;