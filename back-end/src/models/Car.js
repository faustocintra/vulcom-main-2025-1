import { z } from 'zod'

const allowedColors = [
  'preto', 'branco', 'vermelho', 'prata', 'cinza',
  'azul', 'verde', 'amarelo', 'marrom', 'laranja'
]

const currentYear = new Date().getFullYear()
const today = new Date()
const storeOpeningDate = new Date('2020-01-01')


export const vehicleSchema = z.object({
  brand: z.string()
    .min(1, { message: 'A marca é obrigatória' })
    .max(25, { message: 'A marca deve ter no máximo 25 caracteres' }),

  model: z.string()
    .min(1, { message: 'O modelo é obrigatório' })
    .max(25, { message: 'O modelo deve ter no máximo 25 caracteres' }),

  color: z.enum(allowedColors, {
    errorMap: () => ({ message: 'Cor inválida' })
  }),

  year_manufacture: z.number({
    required_error: 'O ano de fabricação é obrigatório',
    invalid_type_error: 'O ano de fabricação deve ser um número'
  }).int().gte(1960, { message: 'Ano mínimo é 1960' })
    .lte(currentYear, { message: `Ano máximo é ${currentYear}` }),

  imported: z.boolean({
    required_error: 'O campo "importado" é obrigatório',
    invalid_type_error: 'O valor de "importado" deve ser true ou false'
  }),

  plates: z.string()
    .length(8, { message: 'A placa deve conter exatamente 8 caracteres' }),

  selling_date: z
    .preprocess((val) => val ? new Date(val) : undefined, z
      .date()
      .min(storeOpeningDate, { message: 'Data não pode ser antes da abertura da loja (01/01/2020)' })
      .max(today, { message: 'Data não pode ser no futuro' })
    )
    .optional(),

  selling_price: z
    .union([
      z.number()
        .min(1000, { message: 'Preço mínimo é R$ 1.000,00' })
        .max(5000000, { message: 'Preço máximo é R$ 5.000.000,00' }),
      z.undefined()
    ])
    .optional(),

  created_user_id: z.number().optional(),
  updated_user_id: z.number().optional(),
})
