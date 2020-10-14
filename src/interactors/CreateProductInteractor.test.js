const CreateProductInteractor = require('./CreateProductInteractor')

const CREATE_PRODUCT_REQUEST = {
  id: '1',
  name: 'Arroz Alteza',
  price: 6.49
}

// FIXME: testing product entity real implementation
describe('CreateProductInteractor', () => {
  describe('exec', () => {
    test('return an error response in product entity error', async () => {
      const createProductInteractor = new CreateProductInteractor({
        create: () => {}
      })
      const response = await createProductInteractor.exec({ name: '', price: null })
      expect(response.statusCode).toEqual(400)
    })

    test('return an error response in gateway errors', async () => {
      const createProductInteractor = new CreateProductInteractor({
        create: jest.fn('productGateway.create').mockRejectedValue(new Error('Product gateway error.'))
      })
      const response = await createProductInteractor.exec(CREATE_PRODUCT_REQUEST)
      expect(response.statusCode).toEqual(400)
      expect(response.message).toEqual('Product gateway error.')
    })

    test('return a success response', async () => {
      const createProductInteractor = new CreateProductInteractor({
        create: jest.fn('productGateway.create').mockResolvedValue()
      })
      const response = await createProductInteractor.exec(CREATE_PRODUCT_REQUEST)
      expect(response.statusCode).toEqual(201)
      expect(response.message).toEqual('Product successfully created.')
    })
  })
})
