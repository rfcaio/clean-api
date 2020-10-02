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
        name: product.name,
        price: product.price
      })

      return {
        statusCode: 201,
        message: `Product ${product.name} with price ${product.price} created with success.`
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