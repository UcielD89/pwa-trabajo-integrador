import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Product } from "../schemas/product.schema";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  // Prices are pre-formatted by useProducts hook (e.g. "$120.99")
  // Check for discount by comparing raw values before formatting
  const initialNum = parseFloat(product.initial_price.replace("$", ""));
  const finalNum = parseFloat(product.final_price.replace("$", ""));
  const hasDiscount = !isNaN(initialNum) && !isNaN(finalNum) && finalNum < initialNum;

  return (
    <Card
      className={cn(
        "overflow-hidden cursor-pointer transition-all duration-200",
        "hover:shadow-lg hover:scale-[1.02]",
        "border-muted"
      )}
      onClick={onClick}
    >
      <div className="aspect-square relative bg-muted overflow-hidden">
        <img
          src={product.main_image}
          alt={product.product_name}
          className="object-cover w-full h-full"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x400?text=No+Image";
          }}
        />
        {hasDiscount && (
          <Badge className="absolute top-2 right-2" variant="destructive">
            Oferta
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-medium text-sm line-clamp-2 min-h-10 mb-2">
          {product.product_name}
        </h3>

        <div className="flex items-center gap-2">
          {hasDiscount && (
            <span className="text-muted-foreground text-sm line-through">
              {product.initial_price}
            </span>
          )}
          <span className="font-semibold text-lg">{product.final_price}</span>
        </div>

        {product.brand && product.brand !== "SHEIN" && (
          <p className="text-xs text-muted-foreground mt-1">{product.brand}</p>
        )}
      </CardContent>
    </Card>
  );
}