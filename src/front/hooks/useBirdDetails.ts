import { useState, useEffect, useCallback } from 'react';
import { Ave } from '../types/bird';
import { fetchAveById } from '../services/birdService';

export const useBirdDetails = (id: number) => {
  const [ave, setAve] = useState<Ave | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadBird = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAveById(id);
      setAve(data);
    } catch (err) {
      setError('Não foi possível carregar os detalhes desta ave.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadBird();
    }
  }, [id, loadBird]);

  return { ave, loading, error, refetch: loadBird };
};