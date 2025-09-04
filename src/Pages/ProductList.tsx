import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../component/ProductCard';
import { products } from '../data/productdata'; 
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import Header from './Header';
import '../App.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Product {
  id: number;
  title: string;
  price: number;
  artist: string;
  description: string;
  dimensions: string;
  medium: string;
  image: string;
  stock?: number;
}

const ProductList: React.FC = () => {
  const [sortOption, setSortOption] = useState<string>('default');
  const [columnOption, setColumnOption] = useState<string>('auto');
  const [showCartDropdown, setShowCartDropdown] = useState<boolean>(false);
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const location = useLocation();

  const handleGoBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCartDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'name') return a.title.localeCompare(b.title);
    return 0;
  });

  const viewCart = () => {
    alert(`You have ${getTotalItems()} items in your cart. Total: $${calculateTotal()}`);
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    navigate('/checkout');
    setShowCartDropdown(false);
  };

  const calculateTotal = (): string => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const getTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const toggleCartDropdown = () => {
    setShowCartDropdown(!showCartDropdown);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="product-list-page min-h-screen bg-gray-50"> 
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="breadcrumb mb-6">
          <button 
            onClick={handleGoBack} 
            className="go-back-btn text-sm text-blue-600 hover:underline flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go Back
          </button>
          <span className="ml-2 text-gray-600"> / Product List</span>
        </div>
        
        <div className="page-header bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="header-content flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-light text-gray-800">Art Collection</h1>
              <p className="text-gray-600 font-light mt-1">Discover unique pieces for your space</p>
            </div>
            
            <div className="cart-section relative" ref={dropdownRef}>
              <div className="flex items-center space-x-4">
                <button 
                  className="cart-button flex items-center bg-white border border-gray-200 rounded-lg py-2 px-4 hover:shadow-md transition-shadow"
                  onClick={toggleCartDropdown}
                >
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </div>
                  <span className="ml-2 hidden md:inline">Cart ({formatPrice(Number(calculateTotal()))})</span>
                </button>
                
                <button 
                  className="checkout-button flex items-center bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition-colors"
                  onClick={proceedToCheckout}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Checkout
                </button>
              </div>
              
              {showCartDropdown && (
                <div className="cart-dropdown absolute right-0 top-full mt-2 w-80 md:w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                  <div className="cart-dropdown-header bg-blue-600 text-white p-4 rounded-t-lg">
                    <h3 className="font-semibold">Your Cart ({getTotalItems()} items)</h3>
                  </div>
                  
                  {cartItems.length === 0 ? (
                    <div className="empty-cart p-6 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="text-gray-600">Your cart is empty</p>
                    </div>
                  ) : (
                    <>
                      <div className="cart-items max-h-80 overflow-y-auto p-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="cart-item flex items-center py-3 border-b border-gray-100 last:border-b-0">
                            <img src={item.image} alt={item.title} className="cart-item-image w-16 h-16 object-cover rounded-md" />
                            <div className="cart-item-details ml-4 flex-1">
                              <h4 className="font-medium text-gray-800 text-sm truncate">{item.title}</h4>
                              <p className="text-gray-500 text-xs">by {item.artist}</p>
                              <div className="cart-item-price text-blue-600 font-semibold text-sm mt-1">
                                {formatPrice(item.price)}
                              </div>
                              <div className="quantity-controls flex items-center mt-2">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuantityChange(item.id, item.quantity - 1);
                                  }}
                                  className="quantity-btn w-6 h-6 flex items-center justify-center bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200"
                                >
                                  −
                                </button>
                                <span className="quantity mx-2 text-sm w-6 text-center">{item.quantity}</span>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuantityChange(item.id, item.quantity + 1);
                                  }}
                                  className="quantity-btn w-6 h-6 flex items-center justify-center bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <button 
                              className="remove-item-btn text-red-500 hover:text-red-700 ml-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromCart(item.id);
                              }}
                              aria-label="Remove item"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="cart-total p-4 bg-gray-50">
                        <div className="cart-total-row flex justify-between text-sm mb-2">
                          <span>Subtotal:</span>
                          <span className="font-medium">{formatPrice(Number(calculateTotal()))}</span>
                        </div>
                        <div className="cart-total-row flex justify-between text-sm mb-2">
                          <span>Shipping:</span>
                          <span>{cartItems.length > 0 ? formatPrice(10) : formatPrice(0)}</span>
                        </div>
                        <div className="cart-total-row flex justify-between text-base font-semibold mt-3 pt-3 border-t border-gray-200">
                          <span>Total:</span>
                          <span className="text-blue-600">
                            {cartItems.length > 0
                              ? formatPrice(Number(calculateTotal()) + 10)
                              : formatPrice(0)}
                          </span>
                        </div>
                      </div>
                      <div className="cart-dropdown-actions p-4 bg-gray-50 rounded-b-lg flex flex-col space-y-2">
                        <button 
                          className="view-cart-btn bg-white border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition-colors"
                          onClick={viewCart}
                        >
                          View Full Cart
                        </button>
                        <button 
                          className="checkout-btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                          onClick={proceedToCheckout}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Secure Checkout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="filters bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
            <select 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
              className="sort-select w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="default">Default Sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
          
          <div className="mobile-column-selector w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">View</label>
            <select 
              value={columnOption} 
              onChange={(e) => setColumnOption(e.target.value)}
              className="column-select w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="auto">Auto Columns</option>
              <option value="2">2 Columns</option>
              <option value="1">1 Column</option>
            </select>
          </div>
        </div>
        
        <div className={`products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 ${columnOption !== 'auto' ? 'custom-columns' : ''}`} 
             data-columns={columnOption}>
          {sortedProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
            />
          ))}
        </div>

        <div className="security-footer bg-white rounded-lg shadow-sm p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Your Security is Our Priority
          </h3>
          <div className="security-features flex flex-wrap justify-center gap-6">
            <div className="security-item flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              SSL Encryption
            </div>
            <div className="security-item flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Payments
            </div>
            <div className="security-item flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Privacy Protected
            </div>
          </div>
        </div>
        
        <p className="copyright text-center text-gray-500 text-sm mt-6">
          © 2025 Adisa Olashile. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ProductList;