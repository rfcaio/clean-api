const express = require('express')

const CreateProductInteractor = require('../interactors/CreateProductInteractor')
const DeleteProductByIdInteractor = require('../interactors/DeleteProductByIdInteractor')
const GetProductByIdInteractor = require('../interactors/GetProductByIdInteractor')
const ListProductsInteractor = require('../interactors/ListProductsInteractor')
const UpdateProductByIdInteractor = require('../interactors/UpdateProductByIdInteractor')

const CreateProductController = require('../adapters/controllers/CreateProductController')
const DeleteProductByIdController = require('../adapters/controllers/DeleteProductByIdController')
const GetProductByIdController = require('../adapters/controllers/GetProductByIdController')
const ListProductsController = require('../adapters/controllers/ListProductsController')
const UpdateProductByIdController = require('../adapters/controllers/UpdateProductByIdController')

const SQLiteProductGateway = require('../adapters/gateways/SQLiteProductGateway')

const CreateProductExpressRouter = require('../adapters/routers/express/CreateProductExpressRouter')
const DeleteProductByIdExpressRouter = require('../adapters/routers/express/DeleteProductByIdExpressRouter')
const GetProductByIdExpressRouter = require('../adapters/routers/express/GetProductByIdExpressRouter')
const ListProductsExpressRouter = require('../adapters/routers/express/ListProductsExpressRouter')
const UpdateProductByIdExpressRouter = require('../adapters/routers/express/UpdateProductByIdExpressRouter')

const productGateway = (
  process.env.ENV_TYPE === 'test'
    ? new SQLiteProductGateway('product.test.db')
    : new SQLiteProductGateway()
)

const createProductInteractor = new CreateProductInteractor(productGateway)
const deleteProductByIdInteractor = new DeleteProductByIdInteractor(productGateway)
const getProductByIdInteractor = new GetProductByIdInteractor(productGateway)
const listProductsInteractor = new ListProductsInteractor(productGateway)
const updateProductByIdInteractor = new UpdateProductByIdInteractor(productGateway)

const createProductController = new CreateProductController(createProductInteractor)
const deleteProductByIdController = new DeleteProductByIdController(deleteProductByIdInteractor)
const getProductByIdController = new GetProductByIdController(getProductByIdInteractor)
const listProductsController = new ListProductsController(listProductsInteractor)
const updateProductByIdController = new UpdateProductByIdController(updateProductByIdInteractor)

const server = express()

server.use(express.json())

server.delete('/product/:id', DeleteProductByIdExpressRouter.route(deleteProductByIdController))

server.get('/product', ListProductsExpressRouter.route(listProductsController))

server.get('/product/:id', GetProductByIdExpressRouter.route(getProductByIdController))

server.post('/product', CreateProductExpressRouter.route(createProductController))

server.put('/product/:id', UpdateProductByIdExpressRouter.route(updateProductByIdController))

process.env.ENV_TYPE !== 'test' && server.listen(3001)

module.exports = { productGateway, server }
