import React from 'react';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some(item => item.id === product.id);
  
  const soldItems = JSON.parse(localStorage.getItem('soldItems') || '{}');
  const isSold = soldItems[product.id] || product.stock === 0;

  const { formatPrice } = useCurrency();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      artist: product.artist,
      image: product.image,
      quantity: 1
    });
    if (onAddToCart) onAddToCart();
  };
  
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };
  
  return (
    <div 
      className="group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden rounded-lg mb-3 aspect-square">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {isSold && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-medium py-1.5 px-2.5 rounded">
            Sold
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 tracking-tight">{product.title}</h3>
        <p className="text-sm text-gray-600">by {product.artist}</p>
        
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            {(product.dimensions || product.medium) && (
              <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                {product.dimensions && <div>{product.dimensions}</div>}
                {product.medium && <div>{product.medium.toUpperCase()}</div>}
              </div>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart} 
            disabled={isSold}
            className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              isSold 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : isInCart 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isSold ? 'Sold' : isInCart ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;