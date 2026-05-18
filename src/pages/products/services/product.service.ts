import productsData from "@/json/products.json";
import type { Product, PaginatedResponse, PaginationParams } from "../schemas/product.schema";

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