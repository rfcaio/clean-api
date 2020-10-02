const express = require('express')

const CreateProduct = require('./interactors/CreateProduct')

const MemoryProductGateway = require('./adapters/MemoryProductGateway')

const memoryProductGateway = new MemoryProductGateway()
const createProduct = new CreateProduct(memoryProductGateway)

const server = express()

server.use(express.json())

server.post('/product', async (req, res) => {
  const { name, price } = req.body
  const { message, statusCode } = (
    await createProduct.create({ name, price: parseFloat(price) })
  )
  return res.status(statusCode).json({ message })
})

server.listen(3001)
