const UpdateProductByIdController = require('./UpdateProductByIdController')

const UUID = require('../helpers/UUID')

jest.mock('../helpers/UUID')

const updateProductByIdInteractor = { exec: jest.fn().mockResolvedValue() }
const updateProductByIdController = (
  new UpdateProductByIdController(updateProductByIdInteractor)
)

describe('UpdateProductByIdController', () => {
  describe('updateById', () => {
    test('throw an error if product id is not valid', async () => {
      UUID.isNotValid = jest.fn().mockReturnValue(true)

      expect.assertions(2)
      expect(updateProductByIdInteractor.exec).not.toHaveBeenCalled()
      await (
        expect(
          updateProductByIdController.updateById({
            id: '1',
            name: 'Arroz Alteza 1Kg',
            price: 6.49
          })
        ).rejects.toEqual(new Error('Product ID must be a valid UUID.'))
      )
    })

    test('throw an error if product name is not provided', async () => {
      UUID.isNotValid = jest.fn().mockReturnValue(false)

      expect.assertions(2)
      expect(updateProductByIdInteractor.exec).not.toHaveBeenCalled()
      await (
        expect(
          updateProductByIdController.updateById({
            id: '5e392019-3d9a-463f-a5cd-a7e7e631be1c',
            price: 6.49
          })
        ).rejects.toEqual(new Error('Product name should not be empty.'))
      )
    })

    test('throw an error if product price is not provided', async () => {
      UUID.isNotValid = jest.fn().mockReturnValue(false)

      expect.assertions(2)
      expect(updateProductByIdInteractor.exec).not.toHaveBeenCalled()
      await (
        expect(
          updateProductByIdController.updateById({
            id: '5e392019-3d9a-463f-a5cd-a7e7e631be1c',
            name: 'Arroz Alteza 1Kg'
          })
        ).rejects.toEqual(new Error('Product price should be a number.'))
      )
    })

    test('call exec interactor method', async () => {
      UUID.isNotValid = jest.fn().mockReturnValue(false)

      await updateProductByIdController.updateById({
        id: '5e392019-3d9a-463f-a5cd-a7e7e631be1c',
        name: 'Arroz Alteza 1Kg',
        price: 6.49
      })

      expect(updateProductByIdInteractor.exec).toHaveBeenCalledWith({
        id: '5e392019-3d9a-463f-a5cd-a7e7e631be1c',
        name: 'Arroz Alteza 1Kg',
        price: 6.49
      })
    })
  })
})
