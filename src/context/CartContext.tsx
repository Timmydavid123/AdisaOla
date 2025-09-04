// context/CartContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { products } from '../data/productdata'; // Import your products data

interface CartItem {
  id: number;
  title: string;
  price: number;
  artist: string;
  image: string;
  quantity: number;
  frame?: string;
  framePrice?: number;
}

interface ProductStock {
  id: number;
  stock: number;
}

interface CartState {
  cartItems: CartItem[];
  productStocks: ProductStock[];
}

interface CartContextType {
  cartItems: CartItem[];
  productStocks: ProductStock[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getCartTotal: () => number;
  getProductStock: (productId: number) => number;
  restoreStock: (productId: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const storedCart = localStorage.getItem('artCart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return [];
  }
};

// Load stock data from localStorage
const loadStockFromStorage = (): ProductStock[] => {
  try {
    const storedStock = localStorage.getItem('artStock');
    if (storedStock) {
      return JSON.parse(storedStock);
    } else {
      // Initialize with current product stocks
      return products.map(product => ({
        id: product.id,
        stock: product.stock || 0
      }));
    }
  } catch (error) {
    console.error('Failed to load stock from localStorage:', error);
    return products.map(product => ({
      id: product.id,
      stock: product.stock || 0
    }));
  }
};

// Save cart to localStorage
const saveCartToStorage = (cartItems: CartItem[]) => {
  try {
    localStorage.setItem('artCart', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

// Save stock data to localStorage
const saveStockToStorage = (productStocks: ProductStock[]) => {
  try {
    localStorage.setItem('artStock', JSON.stringify(productStocks));
  } catch (error) {
    console.error('Failed to save stock to localStorage:', error);
  }
};

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'CLEAR_CART' }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'LOAD_STOCK'; payload: ProductStock[] }
  | { type: 'UPDATE_STOCK'; payload: { productId: number; quantity: number } }
  | { type: 'RESTORE_STOCK'; payload: { productId: number; quantity: number } };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...state, cartItems: action.payload };
    
    case 'LOAD_STOCK':
      return { ...state, productStocks: action.payload };
    
    case 'ADD_TO_CART':
      { const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      let updatedCart;
      
      if (existingItem) {
        updatedCart = state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedCart = [...state.cartItems, action.payload];
      }
      
      // Update stock
      const updatedStocks = state.productStocks.map(stock =>
        stock.id === action.payload.id
          ? { ...stock, stock: Math.max(0, stock.stock - action.payload.quantity) }
          : stock
      );
      
      saveCartToStorage(updatedCart);
      saveStockToStorage(updatedStocks);
      return { cartItems: updatedCart, productStocks: updatedStocks }; }
    
    case 'REMOVE_FROM_CART':
      { const itemToRemove = state.cartItems.find(item => item.id === action.payload);
      const filteredCart = state.cartItems.filter(item => item.id !== action.payload);
      
      // Restore stock if item was removed
      let restoredStocks = state.productStocks;
      if (itemToRemove) {
        restoredStocks = state.productStocks.map(stock =>
          stock.id === itemToRemove.id
            ? { ...stock, stock: stock.stock + itemToRemove.quantity }
            : stock
        );
      }
      
      saveCartToStorage(filteredCart);
      saveStockToStorage(restoredStocks);
      return { cartItems: filteredCart, productStocks: restoredStocks }; }
    
    case 'UPDATE_QUANTITY':
      { const itemToUpdate = state.cartItems.find(item => item.id === action.payload.productId);
      const quantityUpdatedCart = state.cartItems.map(item =>
        item.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0); // Remove if quantity is 0
      
      // Update stock based on quantity change
      let stockUpdatedStocks = state.productStocks;
      if (itemToUpdate) {
        const quantityDifference = itemToUpdate.quantity - action.payload.quantity;
        stockUpdatedStocks = state.productStocks.map(stock =>
          stock.id === action.payload.productId
            ? { ...stock, stock: stock.stock + quantityDifference }
            : stock
        );
      }
      
      saveCartToStorage(quantityUpdatedCart);
      saveStockToStorage(stockUpdatedStocks);
      return { cartItems: quantityUpdatedCart, productStocks: stockUpdatedStocks }; }
    
    case 'UPDATE_STOCK':
      { const stockReducedStocks = state.productStocks.map(stock =>
        stock.id === action.payload.productId
          ? { ...stock, stock: Math.max(0, stock.stock - action.payload.quantity) }
          : stock
      );
      
      saveStockToStorage(stockReducedStocks);
      return { ...state, productStocks: stockReducedStocks }; }
    
    case 'RESTORE_STOCK':
      { const stockRestoredStocks = state.productStocks.map(stock =>
        stock.id === action.payload.productId
          ? { ...stock, stock: stock.stock + action.payload.quantity }
          : stock
      );
      
      saveStockToStorage(stockRestoredStocks);
      return { ...state, productStocks: stockRestoredStocks }; }
    
    case 'CLEAR_CART':
      // Restore all stock when clearing cart
      { const clearedCartStocks = state.productStocks.map(stock => {
        const cartItem = state.cartItems.find(item => item.id === stock.id);
        return cartItem 
          ? { ...stock, stock: stock.stock + cartItem.quantity }
          : stock;
      });
      
      saveCartToStorage([]);
      saveStockToStorage(clearedCartStocks);
      return { cartItems: [], productStocks: clearedCartStocks }; }
    
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { 
    cartItems: [], 
    productStocks: products.map(product => ({
      id: product.id,
      stock: product.stock || 0
    }))
  });

  // Load cart and stock from localStorage on initial render
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    const savedStock = loadStockFromStorage();
    dispatch({ type: 'LOAD_CART', payload: savedCart });
    dispatch({ type: 'LOAD_STOCK', payload: savedStock });
  }, []);

  const addToCart = (product: CartItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const getCartTotal = (): number => {
    return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getProductStock = (productId: number): number => {
    const productStock = state.productStocks.find(stock => stock.id === productId);
    return productStock ? productStock.stock : 0;
  };

  const restoreStock = (productId: number, quantity: number) => {
    dispatch({ type: 'RESTORE_STOCK', payload: { productId, quantity } });
  };

  return (
    <CartContext.Provider value={{
      cartItems: state.cartItems,
      productStocks: state.productStocks,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      getCartTotal,
      getProductStock,
      restoreStock
    }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};