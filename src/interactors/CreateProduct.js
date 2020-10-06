const Product = require('../entities/Product')

class CreateProduct {
  constructor (productGateway) {
    this._productGateway = productGateway
  }

  async create (createProductRequest) {
    const { name, price } = createProductRequest
    try {
      const product = new Product({ name, price })

      await this._productGateway.create({
        id: product.id,
        name: product.name,
        price: product.price
      })

      return {
        statusCode: 201,
        message: 'Product successfully created.'
      }
    } catch (err) {
      return {
        statusCode: 400,
        message: err.message
      }
    }
  }
}

module.exports = CreateProduct
