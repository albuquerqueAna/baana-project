import { useState, useEffect, useCallback } from 'react';
import { Ave } from '../types/bird';
import { fetchAves } from '../services/birdService';

export const useBirds = (busca: string) => {
  const [aves, setAves] = useState<Ave[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadAves = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAves(busca);
      setAves(data);
    } catch (err) {
      setError('Não foi possível carregar as aves. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  }, [busca]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadAves();
    }, 500);

    return () => clearTimeout(timer);
  }, [busca, loadAves]);

  return { aves, loading, error, refetch: loadAves };
};