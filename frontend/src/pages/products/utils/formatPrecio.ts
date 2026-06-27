/**
 * Normaliza un precio a formato "$ 10.000" con separador de miles con punto.
 * Acepta: "$10.000", "$ 10.000", "10000", "$10000", "10.000"
 * Devuelve: "$ 10.000" (con espacio después del $)
 *
 * Idempotente: si ya está en formato "$ 10.000" lo deja igual.
 */
export function formatPrecio(raw: string | number): string {
  if (typeof raw === "number") {
    return `$${raw.toLocaleString("es-AR", { minimumFractionDigits: 0 })}`.replace(/\$/g, "$ ");
  }
  // Limpiar: sacar $, espacios, separadores
  const cleaned = String(raw).replace(/[$.\s]/g, "").replace(/[^0-9]/g, "");
  if (!cleaned) return raw;
  const num = parseInt(cleaned, 10);
  if (isNaN(num)) return raw;
  return `$ ${num.toLocaleString("es-AR")}`;
}