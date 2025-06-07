import { z } from "zod";

const currentYear = new Date().getFullYear();
const today = new Date();
const storeOpeningDate = new Date("2020-01-01");

const validColors = [
  "preto", "branco", "vermelho", "azul", "cinza", "prata", "verde"
];

export const vehicleSchema = z.object({
  brand: z.string().min(1).max(25),
  model: z.string().min(1).max(25),
  color: z.enum(validColors),
  
  // Converte para número se vier como string e valida o ano de fabricação
  year_manufacture: z.preprocess((val) => {
    if (typeof val === "string") return parseInt(val, 10);
    return val;
  }, z.number().int().gte(1960).lte(currentYear)),

  // Converte o valor para boolean se vier como string "true" ou "false"
  imported: z.preprocess((val) => {
    if (val === "true") return true;
    if (val === "false") return false;
    return val;
  }, z.boolean()),

  plates: z.string().length(8),

  // Converte a data para objeto Date e valida se está dentro do intervalo permitido
  selling_date: z.preprocess((val) => {
    if (typeof val === "string") {
      if (val.trim() === "") return undefined; // Trata strings vazias
      return new Date(val);
    }
    return val;
  }, z.date()
    .refine(date => date >= storeOpeningDate && date <= today, {
      message: "A data de venda deve estar entre 01/01/2020 e a data atual."
    })
    .optional()
  ),

  // Converte o valor para número se necessário e permite que seja opcional
  selling_price: z.preprocess((val) => {
    if (val === "" || val === null) return undefined;
    return typeof val === "string" ? Number(val) : val;
  }, z.number().gte(1000).lte(5000000).optional()),

  // Converte para número (caso venha como string) e torna opcional
  created_user_id: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return undefined;
    return typeof val === "string" ? Number(val) : val;
  }, z.number().int().optional()),

  updated_user_id: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return undefined;
    return typeof val === "string" ? Number(val) : val;
  }, z.number().int().optional()),
});
