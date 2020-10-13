const UUID = require('../helpers/UUID')

class DeleteProductByIdController {
  constructor (deleteProductByIdInteractor) {
    this._deleteProductByIdInteractor = deleteProductByIdInteractor
  }

  async deleteById (id) {
    if (UUID.isNotValid(id)) {
      throw new Error('Product ID must be a valid UUID.')
    }
    return await this._deleteProductByIdInteractor.exec(id)
  }
}

module.exports = DeleteProductByIdController
