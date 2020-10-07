class DeleteProductByIdInteractor {
  constructor (productGateway) {
    this._productGateway = productGateway
  }

  async exec (deleteProductByIdRequest) {
    const { id } = deleteProductByIdRequest
    try {
      await this._productGateway.deleteById(id)
      return { statusCode: 204 }
    } catch (err) {
      return {
        statusCode: 400,
        message: err.message
      }
    }
  }
}

module.exports = DeleteProductByIdInteractor
