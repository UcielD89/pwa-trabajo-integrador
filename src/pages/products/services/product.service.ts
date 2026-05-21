import productsData from "@/json/products.json";
import type { Product, PaginatedResponse, PaginationParams } from "../schemas/product.schema";

// [AGREGADO] Interfaz que define todos los criterios de filtrado disponibles.
// Se usa string para minPrice/maxPrice para simplificar el binding con inputs HTML
// (un input vacío es "" en lugar de undefined/NaN).
export interface ProductFilters {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  inStockOnly: boolean;
  hasDiscount: boolean;
}

// [AGREGADO] Valores por defecto de los filtros: todos vacíos/falsos (sin filtro activo).
// Se exporta para poder resetear desde el hook con clearFilters().
export const DEFAULT_FILTERS: ProductFilters = {
  search: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  inStockOnly: false,
  hasDiscount: false,
};

/**
 * Format price with currency symbol
 */
export const formatPrice = (price: string): string => {
  const num = parseFloat(price);
  return isNaN(num) ? price : `$${num.toFixed(2)}`;
};

/**
 * Check if URL is a valid image (not a product page or non-image URL)
 */
const isValidImageUrl = (url: string): boolean => {
  if (!url.startsWith("http")) return false;
  if (url.includes("us.shein.com/")) return false;

  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif"];
  return imageExtensions.some((ext) => url.toLowerCase().includes(ext));
};

/**
 * Process raw product: filter invalid images, format prices
 */
const processProduct = (product: Product): Product => {
  let validImageUrls: string[] = [];
  try {
    const parsed = JSON.parse(product.image_urls);
    if (Array.isArray(parsed)) {
      validImageUrls = parsed.filter(isValidImageUrl);
    }
  } catch {
    // Keep empty on parse error
  }

  return {
    ...product,
    image_urls: JSON.stringify(validImageUrls),
    initial_price: formatPrice(product.initial_price),
    final_price: formatPrice(product.final_price),
  };
};

/**
 * Get all products with pagination support
 */
export function getAllProducts(
  params?: PaginationParams
): PaginatedResponse<Product> {
  const { skip = 0, take = 10 } = params ?? {};

  const data = productsData as Product[];
  const total = data.length;

  return {
    data,
    total,
    skip,
    take,
  };
}

/**
 * Get products with pagination (slice based on skip/take)
 * Applies domain transformations: image filtering + price formatting
 */
export function getProductsPaginated(
  params: PaginationParams
): PaginatedResponse<Product> {
  const { skip, take } = params;

  const data = productsData as Product[];
  const total = data.length;

  // Bounds validation
  const validSkip = Math.max(0, Math.min(skip, total));
  const validTake = Math.max(1, Math.min(take, total - validSkip));

  const paginatedData = data
    .slice(validSkip, validSkip + validTake)
    .map(processProduct);

  return {
    data: paginatedData,
    total,
    skip: validSkip,
    take: validTake,
  };
}

/**
 * Get a single product by ID
 */
export function getProductById(productId: string): Product | undefined {
  const data = productsData as Product[];
  return data.find((p) => p.product_id === productId);
}

// [AGREGADO] Extrae las categorías únicas de todos los productos y las devuelve
// ordenadas alfabéticamente para poblar el select de filtros.
export function getCategories(): string[] {
  const data = productsData as Product[];
  const cats = new Set<string>();
  data.forEach((p) => { if (p.category) cats.add(p.category); });
  return Array.from(cats).sort();
}

// [AGREGADO] Versión de getProductsPaginated que aplica filtros antes de paginar.
// El filtrado se hace sobre el array completo (no sobre la página actual) para que
// el total y la paginación reflejen los resultados filtrados correctamente.
export function getProductsFilteredPaginated(
  params: PaginationParams,
  filters: ProductFilters = DEFAULT_FILTERS
): PaginatedResponse<Product> {
  const { skip, take } = params;
  const { search, category, minPrice, maxPrice, inStockOnly, hasDiscount } = filters;

  let data = productsData as Product[];

  // Filtro por texto: busca en el nombre del producto (case-insensitive)
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    data = data.filter((p) => p.product_name.toLowerCase().includes(q));
  }

  // Filtro por categoría exacta
  if (category) {
    data = data.filter((p) => p.category === category);
  }

  // Filtro: solo productos con stock disponible
  if (inStockOnly) {
    data = data.filter((p) => p.in_stock === "true");
  }

  // Filtro: solo productos cuyo precio final es menor al precio inicial (tienen descuento)
  if (hasDiscount) {
    data = data.filter((p) => {
      const ini = parseFloat(p.initial_price);
      const fin = parseFloat(p.final_price);
      return !isNaN(ini) && !isNaN(fin) && fin < ini;
    });
  }

  // Filtro por precio mínimo (se ignora si el campo está vacío)
  if (minPrice !== "") {
    const min = parseFloat(minPrice);
    if (!isNaN(min)) {
      data = data.filter((p) => {
        const fin = parseFloat(p.final_price);
        return !isNaN(fin) && fin >= min;
      });
    }
  }

  // Filtro por precio máximo (se ignora si el campo está vacío)
  if (maxPrice !== "") {
    const max = parseFloat(maxPrice);
    if (!isNaN(max)) {
      data = data.filter((p) => {
        const fin = parseFloat(p.final_price);
        return !isNaN(fin) && fin <= max;
      });
    }
  }

  const total = data.length;
  // Cuando no hay resultados, validTake usa el take original para no romper la paginación
  const validSkip = Math.max(0, Math.min(skip, total));
  const validTake = total === 0 ? take : Math.max(1, Math.min(take, total - validSkip));

  const paginatedData = data
    .slice(validSkip, validSkip + validTake)
    .map(processProduct);

  return {
    data: paginatedData,
    total,
    skip: validSkip,
    take: validTake,
  };
}
