import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { Empty } from 'antd'; 
import { ReloadOutlined } from '@ant-design/icons'; // Ícone novo

import { BirdCard } from '../../views/Home/BirdCard';
import { SearchBar } from '../../views/Home/SearchBar';
import { TodaysPick } from '../../views/Home/TodaysPick';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { useBirds } from '../../hooks/useBirds';

export const Home = () => {
  const [busca, setBusca] = useState('');
  
  // NOVO: Controle de quantos itens exibir (Paginação Front-end)
  const QTD_POR_PAGINA = 12;
  const [itensVisiveis, setItensVisiveis] = useState(QTD_POR_PAGINA);

  const { aves, loading, error, refetch } = useBirds(busca);
  const aveDoDia = aves?.find((ave) => ave.id === 89);

  // NOVO: Função chamada ao digitar na barra de pesquisa
  const handleBusca = (valor: string) => {
    setBusca(valor);
    setItensVisiveis(QTD_POR_PAGINA); // Reseta a paginação ao fazer uma nova busca
  };

  // NOVO: Função para o botão Carregar Mais
  const handleCarregarMais = () => {
    setItensVisiveis(prev => prev + QTD_POR_PAGINA);
  };

  // Pega apenas as aves que cabem na página atual
  const avesPaginadas = aves?.slice(0, itensVisiveis) || [];
  
  // Verifica se ainda tem mais aves pra mostrar
  const temMaisAves = aves?.length > itensVisiveis;

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        color: 'text.primary',
        transition: 'background-color 0.3s ease',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Header />

      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
        <Container maxWidth="md" sx={{ textAlign: 'center', mb: 8, mt: 4 }}>
          {/* Atualizado para usar a nova função que reseta a página */}
          <SearchBar value={busca} onChange={handleBusca} />
        </Container>

        <Container maxWidth="lg" sx={{ pb: 8 }}>
          {!busca && !loading && aveDoDia && (
            <TodaysPick ave={aveDoDia} />
          )}

          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'text.primary' }}>
            {busca ? 'Resultados da Busca' : 'Explore Outras Espécies'}
          </Typography>

          {error && (
            <Alert severity="error" action={<Button color="inherit" size="small" onClick={refetch}>Tentar Novamente</Button>} sx={{ mb: 4, borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Skeleton variant="rounded" width="100%" height={380} sx={{ borderRadius: '16px' }} />
                </Grid>
              ))}
            </Grid>
          ) : (
            !error && aves.length === 0 ? (
              <Box sx={{ py: 8, display: 'flex', justifyContent: 'center', bgcolor: 'background.paper', borderRadius: '24px' }}>
                <Empty description={<Typography color="text.secondary">Nenhuma ave encontrada para essa busca.</Typography>} />
              </Box>
            ) : (
              <>
                <Grid container spacing={3}>
                  {/* Usa a lista fatiada (paginada) em vez da completa */}
                  {avesPaginadas.map((ave) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={ave.id} sx={{ display: 'flex' }}>
                      <BirdCard ave={ave} />
                    </Grid>
                  ))}
                </Grid>

                {/* BOTÃO CARREGAR MAIS */}
                {temMaisAves && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                    <Button 
                      variant="outlined" 
                      size="large"
                      startIcon={<ReloadOutlined />}
                      onClick={handleCarregarMais}
                      sx={{ 
                        borderRadius: '24px', 
                        px: 4, 
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        borderWidth: '2px',
                        '&:hover': { borderWidth: '2px' }
                      }}
                    >
                      Carregar Mais
                    </Button>
                  </Box>
                )}
              </>
            )
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};