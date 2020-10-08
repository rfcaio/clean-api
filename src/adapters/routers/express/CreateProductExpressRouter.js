class CreateProductExpressRouter {
  static route (createProductController) {
    return async (req, res) => {
      try {
        const { name, price } = req.body
        try {
          const createProductResponse = (
            await createProductController.create({ name, price })
          )
          const { message, statusCode } = createProductResponse
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

module.exports = CreateProductExpressRouter
