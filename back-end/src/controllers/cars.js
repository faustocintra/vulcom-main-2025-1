import prisma from '../database/client.js'
import { vehicleSchema } from '../models/Car.js' // Validador Zod
import { ZodError } from 'zod'

const controller = {}

controller.create = async function(req, res) {
  try {
    // Conversões
    if (req.body.selling_date) req.body.selling_date = new Date(req.body.selling_date)

    if (req.body.year_manufacture) req.body.year_manufacture = Number(req.body.year_manufacture)

    if (req.body.selling_price === '' || req.body.selling_price === null) {
      req.body.selling_price = null
    } else if (req.body.selling_price) {
      req.body.selling_price = Number(req.body.selling_price)
    }

    if (req.body.customer_id === '' || req.body.customer_id === null) {
      req.body.customer_id = null
    } else if (req.body.customer_id) {
      req.body.customer_id = Number(req.body.customer_id)
    }

    // Preenche usuário autenticado
    if (!req.authUser || !req.authUser.id) {
      return res.status(401).json({ error: 'Usuário não autenticado.' })
    }

    req.body.created_user_id = req.authUser.id
    req.body.updated_user_id = req.authUser.id

    const validatedData = vehicleSchema.parse(req.body)

    await prisma.car.create({ data: validatedData })

    res.status(201).end()
  }
  catch (error) {
    console.error(error)

    if (error instanceof ZodError) {
      return res.status(422).json({ error: error.errors }) // 422 para erro de validação
    }

    res.status(500).end()
  }
}

controller.retrieveAll = async function(req, res) {
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
  }
  catch (error) {
    console.error(error)
    res.status(500).end()
  }
}

controller.retrieveOne = async function(req, res) {
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
  }
  catch (error) {
    console.error(error)
    res.status(500).end()
  }
}

controller.update = async function(req, res) {
  try {
    // Conversões
    if (req.body.selling_date) req.body.selling_date = new Date(req.body.selling_date)

    if (req.body.year_manufacture) req.body.year_manufacture = Number(req.body.year_manufacture)

    if (req.body.selling_price === '' || req.body.selling_price === null) {
      req.body.selling_price = null
    } else if (req.body.selling_price) {
      req.body.selling_price = Number(req.body.selling_price)
    }

    if (req.body.customer_id === '' || req.body.customer_id === null) {
      req.body.customer_id = null
    } else if (req.body.customer_id) {
      req.body.customer_id = Number(req.body.customer_id)
    }

    if (!req.authUser || !req.authUser.id) {
      return res.status(401).json({ error: 'Usuário não autenticado.' })
    }

    req.body.updated_user_id = req.authUser.id

    const validatedData = vehicleSchema.parse(req.body)

    const result = await prisma.car.update({
      where: { id: Number(req.params.id) },
      data: validatedData
    })

    res.status(204).end()
  }
  catch (error) {
    console.error(error)

    if (error?.code === 'P2025') return res.status(404).end()

    if (error instanceof ZodError) {
      return res.status(422).json({ error: error.errors })
    }

    res.status(500).end()
  }
}

controller.delete = async function(req, res) {
  try {
    await prisma.car.delete({
      where: { id: Number(req.params.id) }
    })

    res.status(204).end()
  }
  catch (error) {
    if (error?.code === 'P2025') {
      res.status(404).end()
    }
    else {
      console.error(error)
      res.status(500).end()
    }
  }
}

export default controller
