class DeleteProductByIdExpressController {
  constructor (deleteProductByIdInteractor) {
    this._deleteProductByIdInteractor = deleteProductByIdInteractor
  }

  route () {
    return async (req, res) => {
      const { id } = req.params
      const response = await this._deleteProductByIdInteractor.exec({
        id: parseInt(id, 10)
      })

      if (response.statusCode === 204) {
        return res.status(204).end()
      }
      res.status(response.statusCode).message({ message: response.message })
    }
  }
}

module.exports = DeleteProductByIdExpressController
