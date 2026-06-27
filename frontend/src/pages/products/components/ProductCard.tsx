import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Producto } from "../schemas/product.schema";

interface ProductCardProps {
  producto: Producto;
}

export function ProductCard({ producto }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200",
        "hover:shadow-lg hover:scale-[1.02]",
        "border-muted"
      )}
    >
      <div className="aspect-square relative bg-muted overflow-hidden">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="object-cover w-full h-full"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x400?text=No+Image";
          }}
        />
      </div>

      <CardContent className="p-4">
        <h3 className="font-medium text-sm line-clamp-2 min-h-10 mb-2">
          {producto.nombre}
        </h3>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">{producto.precio}</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/productos/${producto.id}`);
          }}
          aria-label={`Ver detalle de ${producto.nombre}`}
        >
          Ver detalle
        </Button>
      </CardContent>
    </Card>
  );
}