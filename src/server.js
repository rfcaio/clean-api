const express = require('express')

const CreateProductInteractor = require('./interactors/CreateProductInteractor')
const DeleteProductByIdInteractor = require('./interactors/DeleteProductByIdInteractor')
const GetProductByIdInteractor = require('./interactors/GetProductByIdInteractor')
const ListProductsInteractor = require('./interactors/ListProductsInteractor')
const UpdateProductByIdInteractor = require('./interactors/UpdateProductByIdInteractor')

const CreateProductExpressController = require('./adapters/controllers/CreateProductExpressController')
const DeleteProductByIdExpressController = require('./adapters/controllers/DeleteProductByIdExpressController')
const GetProductByIdExpressController = require('./adapters/controllers/GetProductByIdExpressController')
const ListProductsExpressController = require('./adapters/controllers/ListProductsExpressController')
const UpdateProductByIdExpressController = require('./adapters/controllers/UpdateProductByIdExpressController')

const SQLiteProductGateway = require('./adapters/gateways/SQLiteProductGateway')

const productGateway = new SQLiteProductGateway()

const createProductInteractor = new CreateProductInteractor(productGateway)
const deleteProductByIdInteractor = new DeleteProductByIdInteractor(productGateway)
const getProductByIdInteractor = new GetProductByIdInteractor(productGateway)
const listProductsInteractor = new ListProductsInteractor(productGateway)
const updateProductByIdInteractor = new UpdateProductByIdInteractor(productGateway)

const createProductExpressController = new CreateProductExpressController(createProductInteractor)
const deleteProductByIdExpressController = new DeleteProductByIdExpressController(deleteProductByIdInteractor)
const getProductByIdExpressController = new GetProductByIdExpressController(getProductByIdInteractor)
const listProductsExpressController = new ListProductsExpressController(listProductsInteractor)
const updateProductByIdExpressController = new UpdateProductByIdExpressController(updateProductByIdInteractor)

const server = express()

server.use(express.json())

server.delete('/product/:id', deleteProductByIdExpressController.route())

server.get('/product', listProductsExpressController.route())

server.get('/product/:id', getProductByIdExpressController.route())

server.post('/product', createProductExpressController.route())

server.put('/product/:id', updateProductByIdExpressController.route())

server.listen(3001)
