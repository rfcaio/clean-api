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
      throw new Error('You must provide a text name.')
    }

    if (!price || isNaN(price)) {
      throw new Error('You must provide a valid number as a price.')
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
