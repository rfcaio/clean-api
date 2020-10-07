class ListProductsExpressController {
  constructor (listProductsInteractor) {
    this._listProductsInteractor = listProductsInteractor
  }

  route () {
    return async (req, res) => {
      const response = await this._listProductsInteractor.exec()

      if (response.statusCode === 200) {
        const { products, statusCode } = response
        return res.status(statusCode).json({ products })
      }
      return res.status(response.statusCode).json({ message: response.message })
    }
  }
}

module.exports = ListProductsExpressController
