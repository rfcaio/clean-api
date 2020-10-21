class ListProductsExpressRouter {
  static route (listProductsController) {
    return async (req, res) => {
      try {
        const listProductsResponse = (
          await listProductsController.listAll()
        )

        const { statusCode } = listProductsResponse
        if (statusCode === 200) {
          const { products } = listProductsResponse
          return res.status(statusCode).json({ products })
        } else {
          const { message } = listProductsResponse
          return res.status(statusCode).json({ message })
        }
      } catch (err) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}

module.exports = ListProductsExpressRouter
