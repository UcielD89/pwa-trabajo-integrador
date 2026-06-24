import { useState, useEffect } from "react";
import type { Product } from "../schemas/product.schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// [MODIFICADO] Se reemplazó ExternalLink (era para el link de SHEIN) por Check
// (se usa para mostrar la confirmación visual al agregar al carrito)
import { ShoppingCart, Check } from "lucide-react";
// [AGREGADO] Hook del carrito para poder llamar a addItem desde el modal
import { useCart } from "@/context/CartContext";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductModal({
  product,
  open,
  onOpenChange,
}: ProductModalProps) {
  // [AGREGADO] Se obtiene la función addItem del contexto del carrito
  const { addItem } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // [AGREGADO] Estado para mostrar confirmación visual ("¡Agregado!") por 1.5 segundos
  const [added, setAdded] = useState(false);

  // [MODIFICADO] Se agregó setAdded(false) para resetear la confirmación visual
  // cuando el usuario abre un producto diferente
  useEffect(() => {
    setSelectedImageIndex(0);
    setAdded(false);
  }, [product?.product_id]);

  // [AGREGADO] Función que agrega el producto al carrito y activa el feedback visual
  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    setAdded(true);
    // Vuelve al texto original después de 1.5 segundos
    setTimeout(() => setAdded(false), 1500);
  };

  // All derived state computed after hooks
  const additionalImages: string[] = (() => {
    if (!product) return [];
    try {
      const parsed = JSON.parse(product.image_urls);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  // Early return AFTER all hooks
  if (!product) return null;

  // Prices are pre-formatted by service (e.g. "$120.99")
  const initialNum = parseFloat(product.initial_price.replace("$", ""));
  const finalNum = parseFloat(product.final_price.replace("$", ""));
  const hasDiscount =
    !isNaN(initialNum) && !isNaN(finalNum) && finalNum < initialNum;

  const discountPercent = hasDiscount
    ? Math.round((1 - finalNum / initialNum) * 100)
    : 0;

  const mainImage =
    additionalImages.length > 0
      ? additionalImages[selectedImageIndex]
      : product.main_image;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogDescription>Detalles del producto</DialogDescription>
          <DialogTitle className="text-xl pr-8">
            {product.product_name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                src={mainImage}
                alt={product.product_name}
                className="object-contain w-full h-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/600x400?text=No+Image";
                }}
              />
            </div>

            {additionalImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {additionalImages.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`${product.product_name} - Imagen ${index + 1}`}
                    className={cn(
                      "w-16 h-16 object-cover rounded border cursor-pointer transition-colors",
                      index === selectedImageIndex
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-muted hover:border-primary"
                    )}
                    onClick={() => setSelectedImageIndex(index)}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            {hasDiscount && (
              <span className="text-muted-foreground text-lg line-through">
                {product.initial_price}
              </span>
            )}
            <span
              className={cn(
                "text-3xl font-bold",
                hasDiscount && "text-destructive"
              )}
            >
              {product.final_price}
            </span>

            {hasDiscount && (
              <Badge variant="destructive" className="text-sm">
                -{discountPercent}%
              </Badge>
            )}
          </div>
          <div>
            <h4 className="font-medium mb-2">Descripción</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {product.description.replace(
                /Free Returns✓ Free Shipping✓\.\s*/gi,
                ""
              )}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {product.brand && (
              <div>
                <span className="text-sm text-muted-foreground">Marca</span>
                <p className="font-medium">{product.brand}</p>
              </div>
            )}
            {product.color && (
              <div>
                <span className="text-sm text-muted-foreground">Color</span>
                <p className="font-medium">{product.color}</p>
              </div>
            )}
            {product.size && product.size !== "one-size" && (
              <div>
                <span className="text-sm text-muted-foreground">Tamaño</span>
                <p className="font-medium">{product.size}</p>
              </div>
            )}
            {product.category && (
              <div>
                <span className="text-sm text-muted-foreground">Categoría</span>
                <p className="font-medium">{product.category}</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                product.in_stock === "true" ? "bg-green-500" : "bg-red-500"
              )}
            />
            <span className="text-sm">
              {product.in_stock === "true" ? "En stock" : "Sin stock"}
            </span>
          </div>

          {/* [MODIFICADO] Se eliminó el botón "Ver en SHEIN" que redirigía a product.url.
              El botón de carrito ahora llama a handleAddToCart, se deshabilita si no hay
              stock y cambia su texto/ícono brevemente como confirmación visual. */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              className="flex-1 gap-2 cursor-pointer"
              disabled={product.in_stock !== "true"}
              onClick={handleAddToCart}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  ¡Agregado!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  {product.in_stock === "true" ? "Agregar al carrito" : "Sin stock"}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
