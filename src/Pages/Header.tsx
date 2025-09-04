// src/components/Header.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';

const Header: React.FC = () => {
  const { currency, setCurrency } = useCurrency();
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setShowCurrencyDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    setShowCurrencyDropdown(false);
  };

  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="flex items-center justify-between">
        {/* Brand Logo / Name */}
        <Link to="/" className="text-xl font-light text-black">
          Adisa Olashile
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <Link to="/shop" className="text-gray-700 hover:text-indigo-600 transition-colors">
            Shop Home
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-indigo-600 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Currency Selector */}
        <div className="flex items-center space-x-4">
          <div className="relative" ref={currencyDropdownRef}>
            <button
              className="flex items-center space-x-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium py-2 px-4 rounded-lg transition-colors"
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              aria-expanded={showCurrencyDropdown}
            >
              <span>{currency}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 
                     0 111.414 1.414l-4 4a1 1 0 
                     01-1.414 0l-4-4a1 1 0 
                     010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {showCurrencyDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <button
                  onClick={() => handleCurrencyChange('USD')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-black transition-colors"
                >
                  USD ($) US Dollar
                </button>
                <button
                  onClick={() => handleCurrencyChange('NGN')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                >
                  NGN (₦) Nigerian Naira
                </button>
                <button
                  onClick={() => handleCurrencyChange('GBP')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                >
                  GBP (£) British Pound
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="h-6 w-6 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Shop Home
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
