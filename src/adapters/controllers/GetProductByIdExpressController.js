class GetProductByIdExpressController {
  constructor (getProductByIdInteractor) {
    this._getProductByIdInteractor = getProductByIdInteractor
  }

  route () {
    return async (req, res) => {
      const { id } = req.params
      const response = await this._getProductByIdInteractor.exec({ id: parseInt(id, 10) })

      if (response.statusCode === 200) {
        const { product, statusCode } = response
        return res.status(statusCode).json(product)
      }
      return res.status(response.statusCode).json({ message: response.message })
    }
  }
}

module.exports = GetProductByIdExpressController
