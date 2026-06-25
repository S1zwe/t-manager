import { useState, useEffect, useCallback } from 'react';
import { Quote } from '../types';
import { fetchMotivationalQuote } from '../services/quoteApi';

interface UseQuoteResult {
  quote: Quote | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useQuote(): UseQuoteResult {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q = await fetchMotivationalQuote();
      setQuote(q);
    } catch {
      setError('Could not load quote');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { quote, loading, error, refresh: load };
}
