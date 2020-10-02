class ListProducts {
  constructor (productGateway) {
    this._productGateway = productGateway
  }

  async listAll () {
    try {
      const products = await this._productGateway.listAll()
      return {
        statusCode: 200,
        products
      }
    } catch (err) {
      return {
        statusCode: 400,
        message: err.message
      }
    }
  }
}

module.exports = ListProducts
