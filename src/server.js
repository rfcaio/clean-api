const express = require('express')

const CreateProduct = require('./interactors/CreateProduct')
const DeleteProductById = require('./interactors/DeleteProductById')
const GetProductById = require('./interactors/GetProductById')
const ListProducts = require('./interactors/ListProducts')
const UpdateProductById = require('./interactors/UpdateProductById')

const InMemoryProductGateway = require('./adapters/InMemoryProductGateway')
const SQLiteProductGateway = require('./adapters/SQLiteProductGateway')

const productGateway = new InMemoryProductGateway()
/* eslint-disable-next-line */
const sqliteProductGateway = new SQLiteProductGateway()
const createProduct = new CreateProduct(productGateway)
const deleteProductById = new DeleteProductById(productGateway)
const getProductById = new GetProductById(productGateway)
const listProducts = new ListProducts(productGateway)
const updateProductById = new UpdateProductById(productGateway)

const server = express()

server.use(express.json())

server.delete('/product/:id', async (req, res) => {
  const { id } = req.params
  const response = await deleteProductById.deleteById({ id: parseInt(id, 10) })

  if (response.statusCode === 204) {
    return res.status(204).end()
  }
  res.status(response.statusCode).message({ message: response.message })
})

server.get('/product', async (req, res) => {
  const response = await listProducts.listAll()

  if (response.statusCode === 200) {
    const { products, statusCode } = response
    return res.status(statusCode).json({ products })
  }
  return res.status(response.statusCode).json({ message: response.message })
})

server.get('/product/:id', async (req, res) => {
  const { id } = req.params
  const response = await getProductById.getById({ id: parseInt(id, 10) })

  if (response.statusCode === 200) {
    const { product, statusCode } = response
    return res.status(statusCode).json(product)
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

server.put('/product/:id', async (req, res) => {
  const { name, price } = req.body
  const { id } = req.params
  const { message, statusCode } = (
    await updateProductById.updateById({
      id: parseInt(id, 10),
      name,
      price: parseFloat(price)
    })
  )
  return res.status(statusCode).json({ message })
})

server.listen(3001)
