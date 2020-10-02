const express = require('express')

const CreateProduct = require('./interactors/CreateProduct')
const ListProducts = require('./interactors/ListProducts')

const MemoryProductGateway = require('./adapters/MemoryProductGateway')

const memoryProductGateway = new MemoryProductGateway()
const createProduct = new CreateProduct(memoryProductGateway)
const listProducts = new ListProducts(memoryProductGateway)

const server = express()

server.use(express.json())

server.get('/product', async (req, res) => {
  const response = await listProducts.listAll()

  if (response.statusCode === 200) {
    const { products, statusCode } = response
    return res.status(statusCode).json({ products })
  }
  return res.status(response.statusCode).json({ message: response.message })
})

server.post('/product', async (req, res) => {
  const { name, price } = req.body
  const { message, statusCode } = (
    await createProduct.create({ name, price: parseFloat(price) })
  )
  return res.status(statusCode).json({ message })
})

server.listen(3001)
