class GetProductById {
  constructor (productGateway) {
    this._productGateway = productGateway
  }

  async getById (getProductByIdRequest) {
    const { id } = getProductByIdRequest
    try {
      const product = await this._productGateway.getById(id)
      if (product) {
        return {
          statusCode: 200,
          product
        }
      } else {
        return {
          statusCode: 404,
          message: 'Product not found.'
        }
      }
    } catch (err) {
      return {
        statusCode: 400,
        message: err.message
      }
    }
  }
}

module.exports = GetProductById
