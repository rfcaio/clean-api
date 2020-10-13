const UUID = require('../helpers/UUID')

class UpdateProductByIdController {
  constructor (updateProductByIdInteractor) {
    this._updateProductByIdInteractor = updateProductByIdInteractor
  }

  async updateById ({ id, name, price }) {
    if (UUID.isNotValid(id)) {
      throw new Error('Product ID must be a valid UUID.')
    }

    if (!name || typeof name !== 'string') {
      throw new Error('Product name should not be empty.')
    }

    if (!price || isNaN(price)) {
      throw new Error('Product price should be a number.')
    }

    return (
      await this._updateProductByIdInteractor.exec({
        id,
        name,
        price: parseFloat(price)
      })
    )
  }
}

module.exports = UpdateProductByIdController
