// src/context/CurrencyContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from 'react';

// Define conversion rates (you might want to fetch these from an API)
const CONVERSION_RATES = {
  USD: 1,
  GBP: 0.79, // 1 USD = 0.79 GBP
  NGN: 1500,  // 1 USD = 1500 NGN
};

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  formatPrice: (price: number) => string;
  convertToUSD: (price: number) => number; // Convert from current currency to USD
  getCurrencyMultiplier: () => number; // Get multiplier for Stripe (cents, kobo, etc.)
  getStripeCurrency: () => string; // Get Stripe-compatible currency code
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
    const convertedPrice = price * CONVERSION_RATES[currency as keyof typeof CONVERSION_RATES];
    
    const formatter = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: currency === 'NGN' ? 0 : 2,
    });

    return formatter.format(convertedPrice);
  };

  const convertToUSD = (price: number): number => {
    // Convert from current currency to USD
    return price / CONVERSION_RATES[currency as keyof typeof CONVERSION_RATES];
  };

  const getCurrencyMultiplier = (): number => {
    // Stripe requires amounts in smallest currency unit
    const multipliers: { [key: string]: number } = {
      USD: 100, // dollars to cents
      GBP: 100, // pounds to pence
      NGN: 100, // naira to kobo
    };
    return multipliers[currency] || 100;
  };

  const getStripeCurrency = (): string => {
    // Ensure we use Stripe-supported currency codes
    return currency;
  };

  const value = {
    currency,
    setCurrency,
    formatPrice,
    convertToUSD,
    getCurrencyMultiplier,
    getStripeCurrency
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};