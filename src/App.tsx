import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Home } from './front/pages/Home';
import { BirdDetails } from './front/pages/BirdDetails'; 
import { Header } from './front/components/Header';
import { Footer } from './front/components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        <Header />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ave/:id" element={<BirdDetails />} />
          </Routes>
        </Box>
        <Footer />
        
      </Box>
    </BrowserRouter>
  );
}

export default App;