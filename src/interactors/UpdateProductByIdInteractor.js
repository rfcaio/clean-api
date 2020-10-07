const Product = require('../entities/Product')

class UpdateProductByIdInteractor {
  constructor (productGateway) {
    this._productGateway = productGateway
  }

  async exec (updateProductByIdRequest) {
    const { id, name, price } = updateProductByIdRequest
    try {
      const product = new Product({ id, name, price })

      await this._productGateway.updateById({
        id: product.id,
        name: product.name,
        price: product.price
      })

      return {
        statusCode: 200,
        message: 'Product succesfully updated.'
      }
    } catch (err) {
      return {
        statusCode: 400,
        message: err.message
      }
    }
  }
}

module.exports = UpdateProductByIdInteractor
