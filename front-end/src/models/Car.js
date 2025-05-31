import { z } from "zod";

// Lista de cores permitidas (extraída do CarForm.jsx)
const allowedColors = [
    "Preto",
    "Branco",
    "Prata",
    "Cinza",
    "Vermelho",
    "Azul",
    "Verde",
    "Amarelo",
    "Marrom",
    "Outro"
];

const currentYear = new Date().getFullYear();
const today = new Date();
const minSellingDate = new Date("2020-01-01");

export const Car = z.object({
    brand: z.string().min(1).max(25),
    model: z.string().min(1).max(25),
    color: z.enum(allowedColors),
    year_manufacture: z.number().int().gte(1960).lte(currentYear),
    imported: z.boolean(),
    plates: z.string().length(8),
    selling_date: z
        .string()
        .optional()
        .refine(
            (date) => {
                if (!date) return true;
                const d = new Date(date);
                return d >= minSellingDate && d <= today;
            },
            { message: "A data de venda deve estar entre 01/01/2020 e hoje." }
        ),
    selling_price: z
        .number()
        .min(1000)
        .max(5000000)
        .optional()
});