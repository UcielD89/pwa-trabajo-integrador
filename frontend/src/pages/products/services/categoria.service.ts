import axios from "@/config/axios.config";
import { CategoriasResponseSchema } from "../schemas/categoria.schema";
import type { Categoria } from "../schemas/categoria.schema";

export const categoriasService = {
  getCategorias: async (): Promise<Categoria[]> => {
    const { data } = await axios.get("/categorias");
    return CategoriasResponseSchema.parse(data).data;
  },
};
