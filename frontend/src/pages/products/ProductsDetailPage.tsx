import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducto } from "./hooks/useProducto.hook";
import { useCart } from "@/hooks/useCart.hook";
import { ProductDetailView } from "./components/ProductDetailView";
import { ProductDetailError } from "./components/ProductDetailError";
import Loader from "@/components/Loading/LoaderComponent";

export function ProductsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addItemWithQuantity } = useCart();

  const [quantity, setQuantity] = useState<number>(1);
  const [addedFeedback, setAddedFeedback] = useState<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const idNumber = parseInt(id ?? "", 10);
  const isValidId = id && !isNaN(idNumber) && idNumber > 0;

  const { producto, isLoading, error } = useProducto(isValidId ? idNumber : 0);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAddToCart = () => {
    if (!producto) return;
    addItemWithQuantity(producto, quantity);
    setAddedFeedback(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setAddedFeedback(false);
    }, 1500);
  };

  if (!isValidId) {
    return <ProductDetailError message="ID de producto inválido" />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error || !producto) {
    return <ProductDetailError message={error ?? "Producto no encontrado"} />;
  }

  return (
    <ProductDetailView
      key={producto.id}
      producto={producto}
      quantity={quantity}
      onQuantityChange={setQuantity}
      onAddToCart={handleAddToCart}
      addedFeedback={addedFeedback}
    />
  );
}