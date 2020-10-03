const Product = require('../entities/Product')

class UpdateProductById {
  constructor (productGateway) {
    this._productGateway = productGateway
  }

  async updateById (updateProductByIdRequest) {
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
        message: `Product ${product.name} with id ${product.id} and price ${product.price} updated with success.`
      }
    } catch (err) {
      return {
        statusCode: 400,
        message: err.message
      }
    }
  }
}

module.exports = UpdateProductById
