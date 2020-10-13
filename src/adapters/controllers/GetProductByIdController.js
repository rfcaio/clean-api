const UUID = require('../helpers/UUID')

class GetProductByIdController {
  constructor (getProductByIdInteractor) {
    this._getProductByIdInteractor = getProductByIdInteractor
  }

  async getById (id) {
    if (UUID.isNotValid(id)) {
      throw new Error('Product ID must be a valid UUID.')
    }
    return await this._getProductByIdInteractor.exec(id)
  }
}

module.exports = GetProductByIdController
