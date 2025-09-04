// src/context/CurrencyContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  formatPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState('USD');

  const formatPrice = (price: number): string => {
    switch (currency) {
      case 'USD':
        return `$${price.toFixed(2)}`;
      case 'NGN':
        return `₦${(price * 1500).toFixed(2)}`; // Example conversion rate
      case 'GBP':
        return `£${(price * 0.8).toFixed(2)}`; // Example conversion rate
      default:
        return `$${price.toFixed(2)}`;
    }
  };

  const value = {
    currency,
    setCurrency,
    formatPrice
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};