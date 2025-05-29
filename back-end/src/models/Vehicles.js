/*
    campo brand: deve ter entre 1 e 25 caracteres;
    campo model: deve ter entre 1 e 25 caracteres;
    campo color: deve uma das cores que estão listadas em front-end/src/pages/CarsForm.jsx;
    campo year_manufacture: deve ter entre 1960 e o ano atual (calcule o ano a partir da data atual);
    campo imported: deve ser um valor booleano (consulte a documentação do Zod em http://zod.dev);
    campo plates: deve ter exatamente 8 caracteres;
    campo selling_date: deve estar entre 01/01/2020 (data em que a loja abriu) e a data de hoje. Pode ser opcional;
    campo selling_price: deve estar entre R$ 1.000,00 (inclusive) e R$ 5.000.000,00 (inclusive) - consulte a documentação do Zod em http://zod.dev. Pode ser opcional.
*/

import { number, z } from 'zod'

const colors = [
    { value: 'AMARELO'},
    { value: 'AZUL'},
    { value: 'BRANCO'},
    { value: 'CINZA'},
    { value: 'DOURADO'},
    { value: 'LARANJA'},
    { value: 'MARROM'},
    { value: 'PRATA'},
    { value: 'PRETO'},
    { value: 'ROSA'},
    { value: 'ROXO'},
    { value: 'VERDE'},
    { value: 'VERMELHO'}
  ]

const allowedColors = colors.map(color => color.value);
const currentYear = new Date().getFullYear();
const TODAY = new Date();
TODAY.setUTCHours(23, 59, 59, 999)
const STORE_OPEN_DATE = new Date('2020-01-01');
STORE_OPEN_DATE.setUTCHours(0, 0, 0, 0);
const MIN_VALUE_SALE = 1000.00
const MAX_VALUE_SALE = 5000000.00

const Vehicles = z.object({
    brand: z.string()
        .trim() 
        .min(1, { message: 'O nome deve ter, no mínimo, 1 caracterer. '})
        .max(25, { message: 'O nome deve ter, no máximo, 25 caracteres.' })
        .r,

    model: z.string()
        .trim() 
        .min(1, { message: 'O nome deve ter, no mínimo, 1 caracterer. '})
        .max(25, { message: 'O nome deve ter, no máximo, 25 caracteres.' }),    

    color: z.string()
        .trim()
        .transform(val => val.toUpperCase()) 
        .refine(val => allowedColors.includes(val), { message: 'A cor não é válida. Escolha entre: '  + allowedColors.join(', ') }),
        
    year_manufacture: z.number()
        .int()
        .min(1960, { message: 'Não aceitamos veículo com ano de fabricação menores que 1960.' })
        .max(currentYear, { message: 'O ano de fabricação não pode ser maior que o ano atual!' }),
    
    imported: z.boolean(),

    plates: z.string()
        .length(8, {message: 'A placa dever conter exatamente 8 caracteres' }),

    selling_date: z.coerce.date()
        .min(STORE_OPEN_DATE, {message: `A data de venda não pode ser anterior a ${STORE_OPEN_DATE.toLocaleDateString('pt-BR')}.` })
        .max(TODAY, { message: `A data de venda não pode ser futura a ${TODAY.toLocaleDateString('pt-BR')}.` })
        .optional(),
     
    selling_price: z.number()
        .min(MIN_VALUE_SALE, { message: `O preço de venda deve ser igual ou superior a R$ ${MIN_VALUE_SALE}.`})
        .max(MAX_VALUE_SALE, { message: `O preço de venda não pode ser superior a R$ ${MAX_VALUE_SALE}.` })
        .optional(),   
})

export default Vehicles