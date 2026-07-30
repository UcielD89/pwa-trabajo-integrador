import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductDetailErrorProps {
  message?: string;
  className?: string;
}

export function ProductDetailError({
  message = "Producto no encontrado",
  className,
}: ProductDetailErrorProps) {
  const navigate = useNavigate();

  return (
    <div
      className={className}
      role="alert"
      aria-live="assertive"
    >
      <div className="container mx-auto py-8 px-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Producto no encontrado</h2>
        <p className="text-muted-foreground mb-6">{message}</p>
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="cursor-pointer"
        >
          Volver a productos
        </Button>
      </div>
    </div>
  );
}