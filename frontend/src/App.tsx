import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { ProductsPage } from "./pages/products/ProductsPage";
import { ProductsDetailPage } from "./pages/products/ProductsDetailPage";
import { useProductos } from "./pages/products/hooks/useProductos.hook";
import { useCategorias } from "./pages/products/hooks/useCategorias.hook";

function Store() {
  const products = useProductos(10);
  const {
    categorias,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useCategorias();

  return (
    <BrowserRouter>
      <Navbar
        categorias={categorias}
        isCategoriesLoading={isCategoriesLoading}
        categoriesError={categoriesError}
        filters={products.filters}
        hasActiveFilters={products.hasActiveFilters}
        onApplyFilters={products.applyFilters}
        onClearFilters={products.clearFilters}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProductsPage
              productos={products.productos}
              meta={products.meta}
              page={products.page}
              isLoading={products.isLoading}
              error={products.error}
              nextPage={products.nextPage}
              prevPage={products.prevPage}
            />
          }
        />
        <Route path="/productos/:id" element={<ProductsDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <CartProvider>
      <Store />
    </CartProvider>
  );
}

export default App;
