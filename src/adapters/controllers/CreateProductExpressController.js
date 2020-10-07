class CreateProductExpressController {
  constructor (createProductInteractor) {
    this._createProductInteractor = createProductInteractor
  }

  route () {
    return async (req, res) => {
      const { name, price } = req.body
      const { message, statusCode } = (
        await this._createProductInteractor.exec({
          name,
          price: parseFloat(price)
        })
      )
      return res.status(statusCode).json({ message })
    }
  }
}

module.exports = CreateProductExpressController
