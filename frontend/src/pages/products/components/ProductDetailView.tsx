import { ArrowBigLeft, Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "./QuantityStepper";
import { formatPrecio } from "../utils/formatPrecio";
import type { Producto } from "../schemas/product.schema";
import { useNavigate } from "react-router-dom";

interface ProductDetailViewProps {
  producto: Producto;
  quantity: number;
  onQuantityChange: (q: number) => void;
  onAddToCart: () => void;
  addedFeedback: boolean;
}

export function ProductDetailView({
  producto,
  quantity,
  onQuantityChange,
  onAddToCart,
  addedFeedback,
}: ProductDetailViewProps) {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="object-contain w-full h-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/600x600?text=No+Image";
            }}
          />
        </div>
        <div className="flex flex-col gap-6">
           <Button
            size="lg"
            className="w-30 cursor-pointer"
            onClick={() => navigate("/productos")}
            aria-live="polite"
          ><ArrowBigLeft /> VOLVER</Button>
          <h1 className="text-3xl font-bold">{producto.nombre}</h1>
          <span className="text-4xl font-bold">{formatPrecio(producto.precio)}</span>
          <div>
            <h2 className="font-medium mb-2">Descripción</h2>
            <p className="text-muted-foreground leading-relaxed">{producto.descripcion}</p>
          </div>
          <div className="flex flex-col items-start gap-2">
              <h2 className="font-medium mb-2">Categoría</h2>
            <p className="text-muted-foreground leading-relaxed">{producto.categoria_nombre}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Cantidad:</span>
            <QuantityStepper value={quantity} onChange={onQuantityChange} />
          </div>

          <Button
            size="lg"
            className="w-full cursor-pointer"
            onClick={onAddToCart}
            aria-live="polite"
          >
            {addedFeedback ? (
              <>
                <Check className="w-5 h-5" />
                ¡Agregado!
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                AGREGAR AL CARRITO
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}