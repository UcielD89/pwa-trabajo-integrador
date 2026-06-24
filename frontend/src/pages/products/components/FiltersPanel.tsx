import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import type { ProductFilters } from "../services/product.service";

interface FiltersPanelProps {
  filters: ProductFilters;
  categories: string[];
  setFilters: (partial: Partial<ProductFilters>) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export function FiltersPanel({
  filters,
  categories,
  setFilters,
  clearFilters,
  hasActiveFilters,
}: FiltersPanelProps) {
  return (
    <div className="p-4 border rounded-lg bg-muted/30 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wide">Categoría</Label>
          <Select
            value={filters.category}
            onValueChange={(value) => setFilters({ category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">Todas las categorías</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wide">
            Precio mínimo ($)
          </Label>
          <Input
            type="number"
            min="0"
            placeholder="0"
            value={filters.minPrice}
            onChange={(e) => setFilters({ minPrice: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wide">
            Precio máximo ($)
          </Label>
          <Input
            type="number"
            min="0"
            placeholder="Sin límite"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ maxPrice: e.target.value })}
          />
        </div>
        <div className="space-y-3">
          <Label className="text-xs uppercase tracking-wide block">
            Opciones
          </Label>
          <div className="flex items-center gap-2">
            <Checkbox
              id="inStockOnly"
              checked={filters.inStockOnly}
              onCheckedChange={(checked) =>
                setFilters({ inStockOnly: checked === true })
              }
            />
            <Label htmlFor="inStockOnly" className="text-sm cursor-pointer">
              Solo en stock
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="hasDiscount"
              checked={filters.hasDiscount}
              onCheckedChange={(checked) =>
                setFilters({ hasDiscount: checked === true })
              }
            />
            <Label htmlFor="hasDiscount" className="text-sm cursor-pointer">
              Con descuento
            </Label>
          </div>
        </div>
      </div>
      {hasActiveFilters && (
        <div className="flex justify-end border-t pt-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="gap-1 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="w-3 h-3" />
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
