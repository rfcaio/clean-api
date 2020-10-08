class GetProductByIdExpressRouter {
  static route (getProductByIdController) {
    return async (req, res) => {
      try {
        const { id } = req.params
        try {
          const getProductByIdResponse = (
            await getProductByIdController.getById(id)
          )

          const { statusCode } = getProductByIdResponse
          if (statusCode === 200) {
            const { product } = getProductByIdResponse
            return res.status(statusCode).json(product)
          } else {
            const { message } = getProductByIdResponse
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

module.exports = GetProductByIdExpressRouter
