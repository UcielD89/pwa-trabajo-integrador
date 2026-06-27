import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// [AGREGADO] Proveedor del carrito: envuelve toda la app para que cualquier
// componente hijo pueda acceder al estado del carrito mediante useCart()
import { CartProvider } from "./context/CartContext";
// [AGREGADO] Barra de navegación superior con el ícono del carrito
import { Navbar } from "./components/Navbar";
import { ProductsPage } from "./pages/products/ProductsPage";
import { ProductsDetailPage } from "./pages/products/ProductsDetailPage";

function App() {
  return (
    // [AGREGADO] CartProvider debe estar en el nivel más alto para que tanto
    // ProductModal (agregar items) como Navbar (mostrar conteo) compartan el mismo estado
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/productos/:id" element={<ProductsDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;