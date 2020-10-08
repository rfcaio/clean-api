class DeleteProductByIdExpressRouter {
  static route (deleteProductByIdController) {
    return async (req, res) => {
      try {
        const { id } = req.params
        try {
          const deleteProductByIdResponse = (
            await deleteProductByIdController.deleteById(id)
          )

          const { statusCode } = deleteProductByIdResponse
          if (statusCode === 204) {
            return res.status(statusCode).end()
          } else {
            const { message } = deleteProductByIdResponse
            return res.status(statusCode).json({ message })
          }
        } catch (err) {
          return res.status(400).json({ message: err.message })
        }
      } catch (err) {
        return res.status(500).json({ message: 'Server error occurred.' })
      }
    }
  }
}

module.exports = DeleteProductByIdExpressRouter
