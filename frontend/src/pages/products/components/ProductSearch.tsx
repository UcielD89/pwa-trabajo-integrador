import { useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ProductFilters } from "../services/product.service";
import { FiltersPanel } from "./FiltersPanel";

interface ProductSearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters: ProductFilters;
  categories: string[];
  setFilters: (partial: Partial<ProductFilters>) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export function ProductSearch({
  filters,
  categories,
  searchValue,
  hasActiveFilters,
  onSearchChange,
  setFilters,
  clearFilters,
}: ProductSearchProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleClearSearch = () => {
    onSearchChange("");
  };

  return (
    <div className="mb-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-9"
          />
          {searchValue && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={handleClearSearch}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2 cursor-pointer shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
          {hasActiveFilters && (
            <span className="bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              !
            </span>
          )}
        </Button>
      </div>
      {showFilters && (
        <div className="mt-4">
          <FiltersPanel
            filters={filters}
            categories={categories}
            setFilters={setFilters}
            clearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      )}
    </div>
  );
}
