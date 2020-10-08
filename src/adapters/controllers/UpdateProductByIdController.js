class UpdateProductByIdController {
  constructor (updateProductByIdInteractor) {
    this._updateProductByIdInteractor = updateProductByIdInteractor
  }

  async updateById ({ id: productId, name, price }) {
    const id = parseInt(productId, 10)

    if (!Number.isInteger(id)) {
      throw new Error('You must provide a valid integer as id.')
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
