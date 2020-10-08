class DeleteProductByIdController {
  constructor (deleteProductByIdInteractor) {
    this._deleteProductByIdInteractor = deleteProductByIdInteractor
  }

  async deleteById (productId) {
    const id = parseInt(productId, 10)

    if (!Number.isInteger(id)) {
      throw new Error('You must provide a valid integer as id.')
    }

    return await this._deleteProductByIdInteractor.exec({ id })
  }
}

module.exports = DeleteProductByIdController
