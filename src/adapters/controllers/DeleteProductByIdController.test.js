const DeleteProductByIdController = require('./DeleteProductByIdController')

const UUID = require('../helpers/UUID')

jest.mock('../helpers/UUID')

const deleteProductByIdInteractor = { exec: jest.fn().mockResolvedValue() }
const deleteProductByIdController = (
  new DeleteProductByIdController(deleteProductByIdInteractor)
)

describe('DeleteProductByIdController', () => {
  describe('deleteById', () => {
    test('throw an error if product id is not valid', async () => {
      UUID.isNotValid = jest.fn().mockReturnValue(true)

      expect.assertions(2)
      expect(deleteProductByIdInteractor.exec).not.toHaveBeenCalled()
      await (
        expect(deleteProductByIdController.deleteById('1'))
          .rejects
          .toEqual(new Error('Product ID must be a valid UUID.'))
      )
    })

    test('call interactor exec method', async () => {
      UUID.isNotValid = jest.fn().mockReturnValue(false)

      await (
        deleteProductByIdController.deleteById('5e392019-3d9a-463f-a5cd-a7e7e631be1c')
      )
      expect(deleteProductByIdInteractor.exec)
        .toHaveBeenCalledWith('5e392019-3d9a-463f-a5cd-a7e7e631be1c')
    })
  })
})
