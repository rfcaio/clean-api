const GetProductByIdController = require('./GetProductByIdController')

const UUID = require('../helpers/UUID')

jest.mock('../helpers/UUID')

const getProductByIdInteractor = { exec: jest.fn().mockResolvedValue() }
const getProductByIdController = (
  new GetProductByIdController(getProductByIdInteractor)
)

describe('GetProductByIdController', () => {
  describe('getById', () => {
    test('throw an error if product id is not valid', async () => {
      UUID.isNotValid = jest.fn().mockReturnValue(true)

      expect.assertions(2)
      expect(getProductByIdInteractor.exec).not.toHaveBeenCalled()
      await (
        expect(getProductByIdController.getById({ id: '1' }))
          .rejects
          .toEqual(new Error('Product ID must be a valid UUID.'))
      )
    })

    test('call interactor exec method', async () => {
      UUID.isNotValid = jest.fn().mockReturnValue(false)

      await (
        getProductByIdController.getById('5e392019-3d9a-463f-a5cd-a7e7e631be1c')
      )
      expect(getProductByIdInteractor.exec)
        .toHaveBeenCalledWith('5e392019-3d9a-463f-a5cd-a7e7e631be1c')
    })
  })
})
