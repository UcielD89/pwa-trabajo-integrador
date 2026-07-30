import { z } from "zod";

export const CategoriaSchema = z.object({
  id: z.number(),
  nombre: z.string(),
});

export const CategoriasResponseSchema = z.object({
  data: z.array(CategoriaSchema),
});

export type Categoria = z.infer<typeof CategoriaSchema>;
