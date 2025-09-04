// src/components/CartDropdown.tsx
import React from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartDropdownProps {
  isOpen: boolean;
  cartItems: CartItem[];
  getTotalItems: () => number;
  calculateTotal: () => number;
  formatPrice: (price: number) => string;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  proceedToCheckout: () => void;
  onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({
  isOpen,
  cartItems,
  getTotalItems,
  calculateTotal,
  formatPrice,
  removeFromCart,
  updateQuantity,
  proceedToCheckout,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="cart-dropdown">
      <div className="cart-dropdown-header">
        <h3>Shopping Cart ({getTotalItems()})</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <h4>{item.name}</h4>
                <p>{formatPrice(item.price)}</p>
              </div>
              <div className="item-controls">
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <button 
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <strong>Total: {formatPrice(calculateTotal())}</strong>
          </div>
          <button className="checkout-button" onClick={proceedToCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;