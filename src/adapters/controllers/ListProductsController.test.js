const ListProductsController = require('./ListProductsController')

describe('ListProductsController', () => {
  describe('listAll', () => {
    test('call interactor exec method', async () => {
      const listProductsInteractor = { exec: jest.fn().mockResolvedValue() }
      const listProductsController = (
        new ListProductsController(listProductsInteractor)
      )

      await listProductsController.listAll()
      expect(listProductsInteractor.exec).toHaveBeenCalled()
    })
  })
})
