const express = require('express')

const CreateProductInteractor = require('./interactors/CreateProductInteractor')
const DeleteProductById = require('./interactors/DeleteProductById')
const GetProductById = require('./interactors/GetProductById')
const ListProductsInteractor = require('./interactors/ListProductsInteractor')
const UpdateProductById = require('./interactors/UpdateProductById')

const CreateProductExpressController = require('./adapters/controllers/CreateProductExpressController')
const ListProductsExpressController = require('./adapters/controllers/ListProductsExpressController')

const SQLiteProductGateway = require('./adapters/gateways/SQLiteProductGateway')

const productGateway = new SQLiteProductGateway()

const createProductInteractor = new CreateProductInteractor(productGateway)
const deleteProductById = new DeleteProductById(productGateway)
const getProductById = new GetProductById(productGateway)
const listProductsInteractor = new ListProductsInteractor(productGateway)
const updateProductById = new UpdateProductById(productGateway)

const createProductExpressController = new CreateProductExpressController(createProductInteractor)
const listProductsExpressController = new ListProductsExpressController(listProductsInteractor)

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

server.get('/product', listProductsExpressController.route())

server.get('/product/:id', async (req, res) => {
  const { id } = req.params
  const response = await getProductById.getById({ id: parseInt(id, 10) })

  if (response.statusCode === 200) {
    const { product, statusCode } = response
    return res.status(statusCode).json(product)
  }
  return res.status(response.statusCode).json({ message: response.message })
})

server.post('/product', createProductExpressController.route())

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
