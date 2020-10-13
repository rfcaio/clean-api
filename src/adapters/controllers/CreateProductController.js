const UUID = require('../helpers/UUID')

class CreateProductController {
  constructor (createProductInteractor) {
    this._createProductInteractor = createProductInteractor
  }

  async create ({ name, price }) {
    if (!name || typeof name !== 'string') {
      throw new Error('You must provide a text name.')
    }

    if (!price || isNaN(price)) {
      throw new Error('You must provide a valid number as a price.')
    }

    const id = UUID.generate()

    return (
      await this._createProductInteractor.exec({ id, name, price: parseFloat(price) })
    )
  }
}

module.exports = CreateProductController
