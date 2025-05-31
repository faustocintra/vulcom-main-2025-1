import { z } from 'zod'

const Colors = [
  'AMARELO', 'AZUL', 'BRANCO', 'CINZA', 'DOURADO', 'ROXO',
  'LARANJA', 'MARROM', 'PRATA', 'PRETO', 'ROSA', 'VERDE', 'VERMELHO'
]

const currentYear = new Date().getFullYear()
const minSellingDate = new Date('2020-01-01')
const maxSellingDate = new Date()

const Car = z.object({

  // campo brand: deve ter entre 1 e 25 caracteres;
  brand: z.string()
    .trim()
    .min(1, { message: 'A marca deve ter pelo menos 1 caractere.' })
    .max(25, { message: 'A marca pode ter no máximo 25 caracteres.' }),


  // campo model: deve ter entre 1 e 25 caracteres;
  model: z.string()
    .trim()
    .min(1, { message: 'O modelo deve ter pelo menos 1 caractere.' })
    .max(25, { message: 'O modelo pode ter no máximo 25 caracteres.' }),


  // campo color: deve uma das cores que estão listadas em 
  // front-end/src/pages/CarsForm.jsx;
  color: z.enum(Colors, { //cores disponíveis na variavel
    message: 'Cor inválida.'
  }),


  // campo year_manufacture: deve ter entre 1960 e o ano atual 
  // (calcule o ano a partir da data atual);
  year_manufacture: z.number()
    .int({ message: 'O ano de fabricação deve ser um número inteiro.' })
    .min(1960, { message: 'O ano de fabricação não pode ser anterior a 1960.' })
    .max(currentYear, { message: `O ano de fabricação não pode ser posterior a ${currentYear}.` }),


  // campo imported: deve ser um valor booleano 
  // (consulte a documentação do Zod em http://zod.dev);
  imported: z.boolean({
    required_error: 'O campo "importado" é obrigatório.',
    invalid_type_error: 'O campo "importado" deve ser verdadeiro ou falso.'
  }),


  // campo plates: deve ter exatamente 8 caracteres;
  plates: z.string()
    .length(8, { message: 'A placa deve ter exatamente 8 caracteres.' }),


  // campo selling_date: deve estar entre 
  // 01/01/2020 (data em que a loja abriu) e a data de hoje. 
  // Pode ser opcional;
  selling_date: z.coerce.date()
    .min(minSellingDate, { message: 'Data de venda não pode ser anterior a 01/01/2020.' })
    .max(maxSellingDate, { message: 'Data de venda não pode ser futura.' })
    .optional(),


  // campo selling_price: deve estar entre 
  // R$ 1.000,00 (inclusive) e R$ 5.000.000,00 (inclusive) - 
  // consulte a documentação do Zod em http://zod.dev. 
  // Pode ser opcional.
  selling_price: z.coerce.number()
    .min(1000, { message: 'Preço de venda deve ser de no mínimo R$ 1.000,00.' })
    .max(5000000, { message: 'Preço de venda deve ser de no máximo R$ 5.000.000,00.' })
    .optional()
})


export default Car
