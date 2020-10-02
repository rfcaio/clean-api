const Product = require('../entities/Product')

class CreateProduct {
  create (createProductRequest) {
    const { name, price } = createProductRequest
    try {
      const product = new Product({ name, price })
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
