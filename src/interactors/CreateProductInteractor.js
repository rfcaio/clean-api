const Product = require('../entities/Product')

class CreateProductInteractor {
  constructor (productGateway) {
    this._productGateway = productGateway
  }

  async exec (createProductRequest) {
    const { id, name, price } = createProductRequest
    try {
      const product = new Product({ id, name, price })

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

module.exports = CreateProductInteractor
