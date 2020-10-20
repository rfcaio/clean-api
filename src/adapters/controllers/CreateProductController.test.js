const CreateProductController = require('./CreateProductController')

const UUID = require('../helpers/UUID')

jest.mock('../helpers/UUID')

const createProductInteractor = { exec: jest.fn().mockResolvedValue() }
const createProductController = (
  new CreateProductController(createProductInteractor)
)

describe('CreateProductController', () => {
  describe('create', () => {
    test('throw an error if product name is not provided', async () => {
      expect.assertions(1)
      await (
        expect(createProductController.create({ price: 6.49 }))
          .rejects
          .toEqual(new Error('Product name should not be empty.'))
      )
    })

    test('throw an error if product price is not provided', async () => {
      expect.assertions(1)
      await (
        expect(createProductController.create({ name: 'Arroz Alteza 1Kg' }))
          .rejects
          .toEqual(new Error('Product price should be a number.'))
      )
    })

    test('call interactor exec method', async () => {
      // FIXME: read jest docs to mock this better
      UUID.generate = (
        jest.fn().mockReturnValue('5e392019-3d9a-463f-a5cd-a7e7e631be1c')
      )

      await createProductController.create({
        name: 'Arroz Alteza 1Kg',
        price: 6.49
      })
      expect(createProductInteractor.exec).toHaveBeenCalledWith({
        id: '5e392019-3d9a-463f-a5cd-a7e7e631be1c',
        name: 'Arroz Alteza 1Kg',
        price: 6.49
      })
    })
  })
})
