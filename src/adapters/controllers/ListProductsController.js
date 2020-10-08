class ListProductsController {
  constructor (listProductsInteractor) {
    this._listProductsInteractor = listProductsInteractor
  }

  async listAll () {
    return await this._listProductsInteractor.exec()
  }
}

module.exports = ListProductsController
