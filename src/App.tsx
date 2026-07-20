import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './front/pages/Home';
 import { BirdDetails } from './front/pages/BirdDetails'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ave/:id" element={<BirdDetails />} />
      </Routes>
    </BrowserRouter>  );
}

export default App;