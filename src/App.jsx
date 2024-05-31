import './css/main.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/header/Header';
import { NotFound } from './components/NotFound';
import { ItemListConteiner } from './components/main/ItemListConteiner';
import { Footer } from './components/footer/Footer';
import { ItemDetailContainter } from './components/main/ItemDetailContainter';

function App() {

  const [numerito, setNumerito] = useState(1);

  return (
    <BrowserRouter>
    <Header numerito={numerito} setNumerito={setNumerito}/>
      <Routes>
        <Route path='/' element={<ItemListConteiner/>} />
        <Route path="/category/:categoryId" element={<ItemListConteiner/>}/>
        <Route path="/item/:itemId" element={<ItemDetailContainter/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
