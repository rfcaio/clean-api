const express = require('express')

const CreateProductInteractor = require('./interactors/CreateProductInteractor')
const DeleteProductById = require('./interactors/DeleteProductById')
const GetProductByIdInteractor = require('./interactors/GetProductByIdInteractor')
const ListProductsInteractor = require('./interactors/ListProductsInteractor')
const UpdateProductByIdInteractor = require('./interactors/UpdateProductByIdInteractor')

const CreateProductExpressController = require('./adapters/controllers/CreateProductExpressController')
const GetProductByIdExpressController = require('./adapters/controllers/GetProductByIdExpressController')
const ListProductsExpressController = require('./adapters/controllers/ListProductsExpressController')
const UpdateProductByIdExpressController = require('./adapters/controllers/UpdateProductByIdExpressController')

const SQLiteProductGateway = require('./adapters/gateways/SQLiteProductGateway')

const productGateway = new SQLiteProductGateway()

const createProductInteractor = new CreateProductInteractor(productGateway)
const deleteProductById = new DeleteProductById(productGateway)
const getProductByIdInteractor = new GetProductByIdInteractor(productGateway)
const listProductsInteractor = new ListProductsInteractor(productGateway)
const updateProductByIdInteractor = new UpdateProductByIdInteractor(productGateway)

const createProductExpressController = new CreateProductExpressController(createProductInteractor)
const getProductByIdExpressController = new GetProductByIdExpressController(getProductByIdInteractor)
const listProductsExpressController = new ListProductsExpressController(listProductsInteractor)
const updateProductByIdExpressController = new UpdateProductByIdExpressController(updateProductByIdInteractor)

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

server.get('/product/:id', getProductByIdExpressController.route())

server.post('/product', createProductExpressController.route())

server.put('/product/:id', updateProductByIdExpressController.route())

server.listen(3001)
