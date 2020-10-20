const UpdateProductByIdInteractor = require('./UpdateProductByIdInteractor')

const UPDATE_PRODUCT_REQUEST = {
  id: '1',
  name: 'Arroz Alteza',
  price: 6.49
}

describe('UpdateProductByIdInteractor', () => {
  describe('exec', () => {
    test('return an error response in update product request error', async () => {
      const productGateway = { updateById: jest.fn() }
      const updateProductByIdInteractor = (
        new UpdateProductByIdInteractor(productGateway)
      )
      const response = await (
        updateProductByIdInteractor.exec({ name: '', price: null })
      )

      expect(productGateway.updateById).not.toHaveBeenCalled()
      expect(response.statusCode).toEqual(400)
    })

    test('return an error response in gateway errors', async () => {
      const productGateway = {
        updateById: jest.fn().mockRejectedValue(new Error('Product gateway error.'))
      }
      const updateProductByIdInteractor = (
        new UpdateProductByIdInteractor(productGateway)
      )
      const response = await (
        updateProductByIdInteractor.exec(UPDATE_PRODUCT_REQUEST)
      )

      expect(productGateway.updateById).toHaveBeenCalledWith(UPDATE_PRODUCT_REQUEST)
      expect(response.statusCode).toEqual(400)
      expect(response.message).toEqual('Product gateway error.')
    })

    test('return a response for product update', async () => {
      const productGateway = { updateById: jest.fn().mockResolvedValue() }
      const updateProductByIdInteractor = (
        new UpdateProductByIdInteractor(productGateway)
      )
      const response = await (
        updateProductByIdInteractor.exec(UPDATE_PRODUCT_REQUEST)
      )

      expect(productGateway.updateById).toHaveBeenCalledWith(UPDATE_PRODUCT_REQUEST)
      expect(response.statusCode).toEqual(200)
      expect(response.message).toEqual('Product successfully updated.')
    })
  })
})
