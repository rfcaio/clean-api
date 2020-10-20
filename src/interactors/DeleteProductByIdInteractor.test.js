const DeleteProductByIdInteractor = require('./DeleteProductByIdInteractor')

describe('DeleteProductByIdInteractor', () => {
  describe('exec', () => {
    test('return an error response in gateway errors', async () => {
      const productGateway = {
        deleteById: jest.fn().mockRejectedValue(new Error('Product gateway error.'))
      }
      const deleteProductByIdInteractor = (
        new DeleteProductByIdInteractor(productGateway)
      )
      const response = await deleteProductByIdInteractor.exec('1')

      expect(productGateway.deleteById).toHaveBeenCalledWith('1')
      expect(response.statusCode).toEqual(400)
      expect(response.message).toEqual('Product gateway error.')
    })

    test('return a response for product removal', async () => {
      const productGateway = { deleteById: jest.fn().mockResolvedValue() }
      const deleteProductByIdInteractor = (
        new DeleteProductByIdInteractor(productGateway)
      )
      const response = await (
        deleteProductByIdInteractor.exec('1')
      )

      expect(productGateway.deleteById).toHaveBeenCalledWith('1')
      expect(response.statusCode).toEqual(204)
      expect(response.message).not.toBeDefined()
    })
  })
})
