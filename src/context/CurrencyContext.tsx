// src/context/CurrencyContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type CurrencyCode = "GBP" | "USD" | "NGN";

const BASE_CURRENCY: CurrencyCode = "GBP";

// Fallback rates (used only if API fails). These are multipliers from GBP -> currency.
const FALLBACK_RATES: Record<CurrencyCode, number> = {
  GBP: 1,
  USD: 1.25,
  NGN: 2000,
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;

  /** Format a price whose *source currency is GBP* */
  formatPrice: (priceInGBP: number) => string;

  /** Convert a GBP price into the currently selected currency (numeric) */
  convertFromGBP: (priceInGBP: number, to?: CurrencyCode) => number;

  /** Convert a price from selected currency back into GBP */
  convertToGBP: (priceInSelectedCurrency: number, from?: CurrencyCode) => number;

  /** Stripe smallest-unit multiplier for selected currency */
  getCurrencyMultiplier: (cur?: CurrencyCode) => number;

  /** Stripe-compatible currency code (lowercase is often used server-side, but Stripe accepts uppercase too) */
  getStripeCurrency: () => CurrencyCode;

  /** Latest rates + status */
  rates: Record<CurrencyCode, number>;
  ratesUpdatedAt: number | null;
  ratesLoading: boolean;
  ratesError: string | null;

  /** Manually refresh rates */
  refreshRates: () => Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within a CurrencyProvider");
  return ctx;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

async function fetchRatesFromFrankfurter(
  base: CurrencyCode,
  symbols: CurrencyCode[],
  signal?: AbortSignal
): Promise<Record<CurrencyCode, number>> {
  // Frankfurter example: /latest?from=GBP&to=USD,NGN
  const to = symbols.filter((c) => c !== base).join(",");
  const url = `https://api.frankfurter.dev/latest?from=${base}${
    to ? `&to=${encodeURIComponent(to)}` : ""
  }`;

  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Rates fetch failed: ${res.status} ${res.statusText}`);
  }
  const data: { rates: Record<string, number> } = await res.json();

  // Build full record including base=1
  const out: Record<CurrencyCode, number> = {
    ...FALLBACK_RATES,
    [base]: 1,
  };

  for (const [k, v] of Object.entries(data.rates || {})) {
    const code = k as CurrencyCode;
    if (symbols.includes(code)) out[code] = v;
  }

  return out;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>(BASE_CURRENCY);

  const [rates, setRates] = useState<Record<CurrencyCode, number>>(() => {
    // Try cached rates first
    try {
      const cached = localStorage.getItem("fx_rates_gbp_base");
      const cachedAt = localStorage.getItem("fx_rates_gbp_base_at");
      if (cached) {
        const parsed = JSON.parse(cached) as Record<CurrencyCode, number>;
        // Ensure base exists
        return { ...FALLBACK_RATES, ...parsed, [BASE_CURRENCY]: 1 };
      }
      void cachedAt;
    } catch {
      // ignore
    }
    return { ...FALLBACK_RATES, [BASE_CURRENCY]: 1 };
  });

  const [ratesUpdatedAt, setRatesUpdatedAt] = useState<number | null>(() => {
    try {
      const cachedAt = localStorage.getItem("fx_rates_gbp_base_at");
      return cachedAt ? Number(cachedAt) : null;
    } catch {
      return null;
    }
  });

  const [ratesLoading, setRatesLoading] = useState(false);
  const [ratesError, setRatesError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const refreshRates = async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setRatesLoading(true);
    setRatesError(null);

    try {
      const symbols: CurrencyCode[] = ["GBP", "USD", "NGN"];
      const fresh = await fetchRatesFromFrankfurter(BASE_CURRENCY, symbols, controller.signal);

      setRates(fresh);
      const now = Date.now();
      setRatesUpdatedAt(now);

      // Cache
      try {
        localStorage.setItem("fx_rates_gbp_base", JSON.stringify(fresh));
        localStorage.setItem("fx_rates_gbp_base_at", String(now));
      } catch {
        // ignore cache failures
      }
    } catch (e: any) {
      // Keep existing rates; just report the error
      setRatesError(e?.message || "Failed to fetch live rates");
    } finally {
      setRatesLoading(false);
    }
  };

  useEffect(() => {
    // Fetch once on mount, then refresh hourly.
    void refreshRates();

    const interval = window.setInterval(() => {
      void refreshRates();
    }, 60 * 60 * 1000);

    return () => {
      window.clearInterval(interval);
      abortRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const convertFromGBP = (priceInGBP: number, to: CurrencyCode = currency) => {
    const rate = rates[to] ?? FALLBACK_RATES[to];
    return priceInGBP * rate;
  };

  const convertToGBP = (price: number, from: CurrencyCode = currency) => {
    const rate = rates[from] ?? FALLBACK_RATES[from];
    // If rate is 0 (should never happen), avoid division blow-up
    return rate ? price / rate : price;
  };

  const formatPrice = (priceInGBP: number): string => {
    const amount = convertFromGBP(priceInGBP, currency);

    const formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      // NGN is typically shown without decimals in many UIs (optional choice)
      minimumFractionDigits: currency === "NGN" ? 0 : 2,
      maximumFractionDigits: currency === "NGN" ? 0 : 2,
    });

    return formatter.format(amount);
  };

  const getCurrencyMultiplier = (cur: CurrencyCode = currency): number => {
    // Stripe smallest units (note: some currencies are 0-decimal; add if you support them)
    const multipliers: Record<CurrencyCode, number> = {
      GBP: 100,
      USD: 100,
      NGN: 100,
    };
    return multipliers[cur] ?? 100;
  };

  const getStripeCurrency = (): CurrencyCode => currency;

  const value = useMemo<CurrencyContextType>(
    () => ({
      currency,
      setCurrency,
      formatPrice,
      convertFromGBP,
      convertToGBP,
      getCurrencyMultiplier,
      getStripeCurrency,
      rates,
      ratesUpdatedAt,
      ratesLoading,
      ratesError,
      refreshRates,
    }),
    [currency, rates, ratesUpdatedAt, ratesLoading, ratesError]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};
