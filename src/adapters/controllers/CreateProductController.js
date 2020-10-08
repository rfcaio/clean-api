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

    return (
      await this._createProductInteractor.exec({ name, price: parseFloat(price) })
    )
  }
}

module.exports = CreateProductController
