class UpdateProductByIdExpressController {
  constructor (updateProductByIdInteractor) {
    this._updateProductByIdInteractor = updateProductByIdInteractor
  }

  route () {
    return async (req, res) => {
      const { name, price } = req.body
      const { id } = req.params
      const { message, statusCode } = (
        await this._updateProductByIdInteractor.exec({
          id: parseInt(id, 10),
          name,
          price: parseFloat(price)
        })
      )
      return res.status(statusCode).json({ message })
    }
  }
}

module.exports = UpdateProductByIdExpressController
