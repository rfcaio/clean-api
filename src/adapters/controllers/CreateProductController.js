const UUID = require('../helpers/UUID')

class CreateProductController {
  constructor (createProductInteractor) {
    this._createProductInteractor = createProductInteractor
  }

  async create ({ name, price }) {
    if (!name || typeof name !== 'string') {
      throw new Error('Product name should not be empty.')
    }

    if (price == null || isNaN(price)) {
      throw new Error('Product price should be a number.')
    }

    const id = UUID.generate()

    return (
      await this._createProductInteractor.exec({ id, name, price: parseFloat(price) })
    )
  }
}

module.exports = CreateProductController
