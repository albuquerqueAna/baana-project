import axios from 'axios';
import { Ave } from '../types/bird';

const nuthatchApi = axios.create({
  baseURL: 'https://nuthatch.lastelm.software',
  headers: {
    'api-key': '9e1d51f1-08a0-4c2d-92d8-6829e933655b',
  },
  timeout: 15000,
});

export const fetchAves = async (busca?: string): Promise<Ave[]> => {
  const response = await nuthatchApi.get('/birds');
  
  let aves: Ave[] = Array.isArray(response.data) 
    ? response.data 
    : (response.data?.entities || []);

  if (busca) {
    const termo = busca.toLowerCase();
    aves = aves.filter(ave => 
      ave.name?.toLowerCase().includes(termo) || 
      ave.family?.toLowerCase().includes(termo)
    );
  }

  return aves;
};

export const fetchAveById = async (id: number): Promise<Ave> => {
  const response = await nuthatchApi.get('/birds');
  
  let aves: Ave[] = Array.isArray(response.data) 
    ? response.data 
    : (response.data?.entities || []);
  
  const ave = aves.find(a => a.id === id);
  
  if (!ave) {
    throw new Error('Ave não encontrada na base de dados.');
  }
  
  return ave;
};