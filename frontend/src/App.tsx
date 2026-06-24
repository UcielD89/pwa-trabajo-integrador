import "./App.css";
// [AGREGADO] Proveedor del carrito: envuelve toda la app para que cualquier
// componente hijo pueda acceder al estado del carrito mediante useCart()
import { CartProvider } from "./context/CartContext";
// [AGREGADO] Barra de navegación superior con el ícono del carrito
import { Navbar } from "./components/Navbar";
import { ProductsPage } from "./pages/products/ProductsPage";

function App() {
  return (
    // [AGREGADO] CartProvider debe estar en el nivel más alto para que tanto
    // ProductModal (agregar items) como Navbar (mostrar conteo) compartan el mismo estado
    <CartProvider>
      {/* [AGREGADO] Navbar sticky con el ícono del carrito */}
      <Navbar />
      <ProductsPage />
    </CartProvider>
  );
}

export default App;