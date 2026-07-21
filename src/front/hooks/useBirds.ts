import { useState, useEffect } from 'react';
import { Ave } from '../types/bird';
import { fetchAves } from '../services/birdService';

export const useBirds = (busca: string) => {
  const [todasAsAves, setTodasAsAves] = useState<Ave[]>([]); // Cache local
  const [avesFiltradas, setAvesFiltradas] = useState<Ave[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const carregarDados = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAves(); 
      setTodasAsAves(data);
      setAvesFiltradas(data);
    } catch (err: any) {
      setError('Erro ao carregar a lista de aves. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    if (!busca.trim()) {
      setAvesFiltradas(todasAsAves);
    } else {
      const termo = busca.toLowerCase();
      const filtradas = todasAsAves.filter(ave => 
        ave.name?.toLowerCase().includes(termo) || 
        ave.family?.toLowerCase().includes(termo) ||
        ave.sciName?.toLowerCase().includes(termo)
      );
      setAvesFiltradas(filtradas);
    }
  }, [busca, todasAsAves]);

  return { 
    aves: avesFiltradas, 
    loading, 
    error, 
    refetch: carregarDados 
  };
};