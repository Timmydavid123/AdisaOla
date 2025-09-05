// src/App.tsx
import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './component/LoadingSpinner';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';

// Lazy load pages for better performance
const LandingPage = lazy(() => import('./Pages/LandingPage'));
const AboutMe = lazy(() => import('./Pages/About'));
const PortfolioPage = lazy(() => import('./Pages/PortfolioList'));
const PortfolioDetailPage = lazy(() => import('./Pages/Portfolio')); 
const ContactForm = lazy(() => import('./Pages/ContactForm')); 
const ShopPage = lazy(() => import('./Pages/ProductList'));
const CheckoutPage = lazy(() => import('./Pages/Checkout'));
const ConfirmationPage = lazy(() => import('./Pages/Confirmation'));
const NotFoundPage = lazy(() => import('./component/NotFoundPage'));
const ProductDetailPage = lazy(() => import('./Pages/ProductDetail'));
const Exhibition = lazy(() => import('./Pages/Exhibition'));

// Image Protection Component
const ImageProtection = () => {
  useEffect(() => {
    // Disable right-click context menu
    const disableContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };
    
    // Disable keyboard shortcuts for saving and developer tools
    const disableKeyShortcuts = (e: KeyboardEvent) => {
      // Disable Ctrl+S, Ctrl+Shift+S, Ctrl+U, F12, etc.
      if (
        (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.key === 'S') ||
        (e.ctrlKey && e.shiftKey && e.key === 'S') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 'U') ||
        (e.metaKey && e.key === 's') || // For Mac
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') || // DevTools
        (e.ctrlKey && e.shiftKey && e.key === 'C') || // DevTools
        (e.ctrlKey && e.key === 'P') // Print
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };
    
    
    // Add event listeners
    document.addEventListener('contextmenu', disableContextMenu);
    document.addEventListener('keydown', disableKeyShortcuts);
    
    // Add CSS to disable text selection and image dragging
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      img {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
        pointer-events: none;
      }
      
      body {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      /* Anti-screenshot overlay */
      .protection-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        pointer-events: none;
        background: transparent;
        mix-blend-mode: difference;
        opacity: 0.02;
      }
    `;
    document.head.appendChild(style);
    
    // Add an invisible overlay that interferes with screenshot tools
    const overlay = document.createElement('div');
    overlay.className = 'protection-overlay';
    document.body.appendChild(overlay);
    
    // Clear the overlay when the component unmounts
    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('keydown', disableKeyShortcuts);
      document.head.removeChild(style);
      document.body.removeChild(overlay);
    };
  }, []);
  
  return null;
};

function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <Router>
          {/* Image Protection Component */}
          <ImageProtection />
          
          <Suspense fallback={<LoadingSpinner/>}>
            <div className="flex flex-col min-h-screen">
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<LandingPage />} />      
                  <Route path="/about" element={<AboutMe />} />   
                  <Route path="/portfolio" element={<PortfolioPage />} /> 
                  <Route path="/portfolio/:id" element={<PortfolioDetailPage />} /> 
                  <Route path="/contact" element={<ContactForm />} /> 
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/confirmation" element={<ConfirmationPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/exhibition" element={<Exhibition />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
            </div>
          </Suspense>
        </Router>
      </CartProvider>
    </CurrencyProvider>
  );
}

export default App;