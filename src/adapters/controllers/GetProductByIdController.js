class GetProductByIdController {
  constructor (getProductByIdInteractor) {
    this._getProductByIdInteractor = getProductByIdInteractor
  }

  async getById (productId) {
    const id = parseInt(productId, 10)
    if (!Number.isInteger(id)) {
      throw new Error('You must provide a valid integer as id.')
    }
    return await this._getProductByIdInteractor.exec({ id: parseInt(id, 10) })
  }
}

module.exports = GetProductByIdController
