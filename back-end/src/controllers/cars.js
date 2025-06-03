import prisma from '../database/client.js';
import { vehicleSchema } from '../models/Car.js';

const controller = {} // Objeto vazio

controller.create = async function (req, res) {
  try {

     // Preenche qual usuário criou o carro com o id do usuário autenticado
    req.body.created_user_id = req.authUser.id

    // Preenche qual usuário modificou por último o carro com o id
    // do usuário autenticado
    req.body.updated_user_id = req.authUser.id

    const validation = vehicleSchema.safeParse(req.body)

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.issues })
    }

    await prisma.car.create({ data: validation.data })

    // HTTP 201: Created
    res.status(201).end()
  } catch (error) {
    console.error(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.retrieveAll = async function (req, res) {
  try {
    const includedRels = req.query.include?.split(',') ?? []

    const result = await prisma.car.findMany({
      orderBy: [
        { brand: 'asc' },
        { model: 'asc' },
        { id: 'asc' }
      ],
      include: {
        customer: includedRels.includes('customer'),
        created_user: includedRels.includes('created_user'),
        updated_user: includedRels.includes('updated_user')
      }
    })

    res.send(result)
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}

controller.retrieveOne = async function (req, res) {
  try {
    const includedRels = req.query.include?.split(',') ?? []

    const result = await prisma.car.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        customer: includedRels.includes('customer'),
        created_user: includedRels.includes('created_user'),
        updated_user: includedRels.includes('updated_user')
      }
    })

    if (result) res.send(result)
    else res.status(404).end()
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}

controller.update = async function (req, res) {
  try {
    req.body.updated_user_id = req.authUser.id

    const validation = vehicleScheSma.safeParse(req.body)

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.issues })
    }

    const result = await prisma.car.update({
      where: { id: Number(req.params.id) },
      data: validation.data
    })

    if (result) res.status(204).end()
    else res.status(404).end()
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}

controller.delete = async function (req, res) {
  try {
    await prisma.car.delete({
      where: { id: Number(req.params.id) }
    })

    res.status(204).end()
  } catch (error) {
    if (error?.code === 'P2025') {
      res.status(404).end()
    } else {
      console.error(error)
      res.status(500).end()
    }
  }
}

export default controller
