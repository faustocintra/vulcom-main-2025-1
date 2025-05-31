import { z } from 'zod'

const allowedColors = [
  'Preto', 'Branco', 'Prata', 'Cinza', 'Vermelho', 'Azul',
  'Verde', 'Amarelo', 'Marrom', 'Bege', 'Roxo', 'Laranja', 'Outro'
]

const currentYear = new Date().getFullYear()
const minSellingDate = new Date('2020-01-01')
const today = new Date()

export default z.object({
  brand: z.string().min(1).max(25),
  model: z.string().min(1).max(25),
  color: z.enum(allowedColors),
  year_manufacture: z.number().int().gte(1960).lte(currentYear),
  imported: z.boolean(),
  plates: z.string().length(8),
  selling_date: z
    .preprocess(val => val ? new Date(val) : undefined, 
      z.date()
        .min(minSellingDate, { message: 'Data mínima: 01/01/2020' })
        .max(today, { message: 'Data máxima: hoje' })
        .optional()
    ),
  selling_price: z
    .number()
    .min(1000, { message: 'Preço mínimo: R$ 1.000,00' })
    .max(5000000, { message: 'Preço máximo: R$ 5.000.000,00' })
    .optional()
})
