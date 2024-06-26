import './styles/styles.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/header/Header';
import { NotFound } from './components/NotFound';
import { ItemListConteiner } from './components/main/ItemListConteiner';
import { Footer } from './components/footer/Footer';
import { ItemDetailContainter } from './components/main/ItemDetailContainter';
import { CartProvider } from './context/CartContext';
import { Carrito } from './components/Carrito';
import { Checkout } from './components/header/Checkout';
import { CargarProductos } from './components/CargarProductos';

function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<ItemListConteiner />} />
          <Route path="/category/:categoryId" element={<ItemListConteiner />} />
          <Route path="/item/:itemId" element={<ItemDetailContainter />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path='/finalizar-compra' element={<Checkout/>}/>
          <Route path='/cargar-productos' element={<CargarProductos/>}/>
          <Route path='/*' element={<NotFound />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
