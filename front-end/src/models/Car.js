import { z } from 'zod'

const allowedColors = [
  'AMARELO', 'AZUL', 'BRANCO', 'CINZA', 'DOURADO', 'LARANJA',
  'MARROM', 'PRATA', 'PRETO', 'ROSA', 'ROXO', 'VERDE', 'VERMELHO'
]

const currentYear = new Date().getFullYear()
const minSellingDate = new Date('2020-01-01')
const today = new Date()

export default z.object({
  brand: z.string().min(1, { message: 'Marca obrigatória' }).max(25, { message: 'Máx. 25 caracteres' }),
  model: z.string().min(1, { message: 'Modelo obrigatório' }).max(25, { message: 'Máx. 25 caracteres' }),
  color: z.enum(allowedColors, { message: 'Cor inválida' }),
  year_manufacture: z.coerce.number().int().gte(1960, { message: 'Ano mínimo: 1960' }).lte(currentYear, { message: `Ano máximo: ${currentYear}` }),
  imported: z.boolean(),
  plates: z.string().length(8, { message: 'Placa deve ter 8 caracteres' }),
  selling_date: z
    .preprocess(val => val ? new Date(val) : undefined, 
      z.date()
        .min(minSellingDate, { message: 'Data mínima: 01/01/2020' })
        .max(today, { message: 'Data máxima: hoje' })
        .optional()
    ),
  selling_price: z
    .coerce.number()
    .min(1000, { message: 'Preço mínimo: R$ 1.000,00' })
    .max(5000000, { message: 'Preço máximo: R$ 5.000.000,00' })
    .optional()
})
