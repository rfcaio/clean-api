class UpdateProductByIdExpressRouter {
  static route (updateProductByIdController) {
    return async (req, res) => {
      try {
        const { name, price } = req.body
        const { id } = req.params
        try {
          const updateProductByIdResponse = (
            await updateProductByIdController.updateById({ id, name, price })
          )
          const { message, statusCode } = updateProductByIdResponse
          return res.status(statusCode).json({ message })
        } catch (err) {
          return res.status(400).json({ message: err.message })
        }
      } catch (err) {
        return res.status(500).json({ message: 'Server error occurred.' })
      }
    }
  }
}

module.exports = UpdateProductByIdExpressRouter
