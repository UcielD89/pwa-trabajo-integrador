import { useState, type FormEvent } from "react";
import { Filter, RotateCcw, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategoryCombobox } from "./CategoryCombobox";
import type { Categoria } from "../schemas/categoria.schema";
import {
  EMPTY_PRODUCTO_FILTERS,
  type ProductoFilters,
} from "../schemas/productFilters.schema";

interface FiltersPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categorias: Categoria[];
  isCategoriesLoading: boolean;
  categoriesError: string | null;
  initialValues: ProductoFilters;
  onApply: (filters: ProductoFilters) => void;
  onClear: () => void;
}

interface FiltersFormProps {
  categorias: Categoria[];
  isCategoriesLoading: boolean;
  categoriesError: string | null;
  initialValues: ProductoFilters;
  onApply: (filters: ProductoFilters) => void;
  onClear: () => void;
  onClose: () => void;
}

function toNonEmpty(value: string): string {
  return value.trim() === "" ? "" : value.trim();
}

function FiltersForm({
  categorias,
  isCategoriesLoading,
  categoriesError,
  initialValues,
  onApply,
  onClear,
  onClose,
}: FiltersFormProps) {
  const [nombre, setNombre] = useState(initialValues.nombre);
  const [categoria, setCategoria] = useState(initialValues.categoria);
  const [precioDesde, setPrecioDesde] = useState(initialValues.precio_desde);
  const [precioHasta, setPrecioHasta] = useState(initialValues.precio_hasta);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const desde = precioDesde === "" ? undefined : Number(precioDesde);
    const hasta = precioHasta === "" ? undefined : Number(precioHasta);

    if (desde !== undefined && hasta !== undefined && desde > hasta) {
      setValidationError("El precio desde no puede superar al precio hasta");
      return;
    }

    onApply({
      nombre: toNonEmpty(nombre),
      categoria,
      precio_desde: toNonEmpty(precioDesde),
      precio_hasta: toNonEmpty(precioHasta),
    });
    onClose();
  };

  const handleClear = () => {
    setNombre(EMPTY_PRODUCTO_FILTERS.nombre);
    setCategoria(EMPTY_PRODUCTO_FILTERS.categoria);
    setPrecioDesde(EMPTY_PRODUCTO_FILTERS.precio_desde);
    setPrecioHasta(EMPTY_PRODUCTO_FILTERS.precio_hasta);
    onClear();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="filter-nombre">Nombre</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="filter-nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            placeholder="Buscar por nombre"
            className="pl-8"
            autoComplete="off"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="filter-categoria">Categoría</Label>
        <CategoryCombobox
          id="filter-categoria"
          categorias={categorias}
          value={categoria}
          onChange={setCategoria}
          disabled={isCategoriesLoading || categoriesError !== null}
        />
        {isCategoriesLoading && (
          <p className="text-xs text-muted-foreground">Cargando categorías...</p>
        )}
        {categoriesError && (
          <p className="text-xs text-destructive" role="alert">
            {categoriesError}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="filter-precio-desde">Precio desde</Label>
          <Input
            id="filter-precio-desde"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={precioDesde}
            onChange={(event) => setPrecioDesde(event.target.value)}
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="filter-precio-hasta">Precio hasta</Label>
          <Input
            id="filter-precio-hasta"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={precioHasta}
            onChange={(event) => setPrecioHasta(event.target.value)}
            placeholder="9999"
          />
        </div>
      </div>

      {validationError && (
        <p className="text-sm text-destructive" role="alert">
          {validationError}
        </p>
      )}

      <DialogFooter className="gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          className="cursor-pointer"
        >
          <RotateCcw className="size-4" />
          Limpiar
        </Button>
        <Button type="submit" className="cursor-pointer">
          <Search className="size-4" />
          Aplicar filtros
        </Button>
      </DialogFooter>
    </form>
  );
}

export function FiltersPanel({
  open,
  onOpenChange,
  categorias,
  isCategoriesLoading,
  categoriesError,
  initialValues,
  onApply,
  onClear,
}: FiltersPanelProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </DialogTitle>
          <DialogDescription>
            Busca productos por nombre, categoría o rango de precio.
          </DialogDescription>
        </DialogHeader>
        <FiltersForm
          categorias={categorias}
          isCategoriesLoading={isCategoriesLoading}
          categoriesError={categoriesError}
          initialValues={initialValues}
          onApply={onApply}
          onClear={onClear}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
