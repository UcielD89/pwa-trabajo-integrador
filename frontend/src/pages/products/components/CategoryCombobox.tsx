import { useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Categoria } from "../schemas/categoria.schema";

export const ALL_CATEGORIES_VALUE = "__all__";

const MAX_VISIBLE_RESULTS = 8;

interface ComboboxOption {
  value: string;
  label: string;
}

interface CategoryComboboxProps {
  id?: string;
  categorias: Categoria[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function CategoryCombobox({
  id,
  categorias,
  value,
  onChange,
  disabled = false,
}: CategoryComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allOption: ComboboxOption = {
    value: ALL_CATEGORIES_VALUE,
    label: "Todas las categorías",
  };

  const normalizedSearch = search.trim().toLocaleLowerCase();
  const matches = categorias.filter((categoria) =>
    categoria.nombre.toLocaleLowerCase().includes(normalizedSearch)
  );
  const visibleMatches = matches.slice(0, MAX_VISIBLE_RESULTS);
  const hiddenCount = matches.length - visibleMatches.length;

  const options: ComboboxOption[] = [
    allOption,
    ...visibleMatches.map((categoria) => ({
      value: String(categoria.id),
      label: categoria.nombre,
    })),
  ];

  const selectedLabel =
    categorias.find((categoria) => String(categoria.id) === value)?.nombre ??
    allOption.label;

  const handleOpenChange = (nextOpen: boolean) => {
    if (disabled) return;
    setOpen(nextOpen);
    if (nextOpen) {
      setSearch("");
      setHighlightedIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const handleSearchChange = (nextSearch: string) => {
    setSearch(nextSearch);
    setHighlightedIndex(0);
  };

  const selectOption = (option: ComboboxOption) => {
    onChange(option.value === ALL_CATEGORIES_VALUE ? "" : option.value);
    setOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((index) => Math.min(index + 1, options.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const option = options[highlightedIndex];
      if (option) selectOption(option);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        id={id}
        type="button"
        disabled={disabled}
        aria-label="Filtrar por categoría"
        className={cn(
          "flex h-9 w-full items-center justify-between gap-1.5 rounded-md border border-input bg-transparent px-2.5 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 dark:hover:bg-input/50"
        )}
      >
        <span className="line-clamp-1 text-left">{selectedLabel}</span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <div className="flex items-center gap-2 border-b border-border px-2.5">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar categoría..."
            className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            autoComplete="off"
          />
        </div>
        <ul role="listbox" className="max-h-64 overflow-y-auto p-1">
          {options.map((option, index) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === (value || ALL_CATEGORIES_VALUE)}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => selectOption(option)}
                className={cn(
                  "flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-hidden select-none",
                  index === highlightedIndex &&
                    "bg-accent text-accent-foreground"
                )}
              >
                <span className="flex size-4 shrink-0 items-center justify-center">
                  {option.value === (value || ALL_CATEGORIES_VALUE) && (
                    <Check className="size-4" />
                  )}
                </span>
                <span className="line-clamp-1">{option.label}</span>
              </button>
            </li>
          ))}
          {visibleMatches.length === 0 && (
            <li className="px-2.5 py-2 text-sm text-muted-foreground">
              No se encontraron categorías.
            </li>
          )}
        </ul>
        {hiddenCount > 0 && (
          <p className="border-t border-border px-2.5 py-1.5 text-xs text-muted-foreground">
            Mostrando {visibleMatches.length} de {matches.length}. Seguí
            escribiendo para acotar la búsqueda.
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
}
