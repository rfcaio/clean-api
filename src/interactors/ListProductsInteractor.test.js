const ListProductsInteractor = require('./ListProductsInteractor')

describe('ListProductsInteractor', () => {
  describe('exec', () => {
    test('return an error response in gateway errors', async () => {
      const listProductsInteractor = new ListProductsInteractor({
        listAll: jest.fn().mockRejectedValue(new Error('Product gateway error.'))
      })
      const response = await listProductsInteractor.exec()

      expect(response.statusCode).toEqual(400)
      expect(response.message).toEqual('Product gateway error.')
    })

    test('return all products successfully', async () => {
      const PRODUCT_LIST = [
        { id: '1', name: 'Arroz Alteza 1Kg', price: 6.49 },
        { id: '2', name: 'Feijão Kicaldo 1Kg', price: 7.99 }
      ]
      const listProductsInteractor = new ListProductsInteractor({
        listAll: jest.fn().mockReturnValue(PRODUCT_LIST)
      })
      const response = await listProductsInteractor.exec()

      expect(response.statusCode).toEqual(200)
      expect(response.products).toEqual(PRODUCT_LIST)
    })
  })
})
