// [AGREGADO] Selector de cantidad para la página de detalle
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantityStepperProps) {
  const decrement = () => {
    const next = Math.max(min, value - 1);
    if (next !== value) onChange(next);
  };
  const increment = () => {
    const next = Math.min(max, value + 1);
    if (next !== value) onChange(next);
  };

  return (
    <div
      className={cn("inline-flex items-center gap-2", className)}
      role="group"
      aria-label="Selector de cantidad"
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={decrement}
        disabled={value <= min}
        aria-label="Disminuir cantidad"
        className="cursor-pointer"
      >
        <Minus className="w-4 h-4" />
      </Button>
      <span
        className="w-10 text-center font-medium tabular-nums"
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </span>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={increment}
        disabled={value >= max}
        aria-label="Aumentar cantidad"
        className="cursor-pointer"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}