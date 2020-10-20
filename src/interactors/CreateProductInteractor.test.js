const CreateProductInteractor = require('./CreateProductInteractor')

const CREATE_PRODUCT_REQUEST = {
  id: '1',
  name: 'Arroz Alteza',
  price: 6.49
}

// FIXME: testing product entity real implementation
describe('CreateProductInteractor', () => {
  describe('exec', () => {
    test('return an error response in create product request error', async () => {
      const productGateway = { create: jest.fn() }
      const createProductInteractor = new CreateProductInteractor(productGateway)
      const response = await createProductInteractor.exec({ name: '', price: null })

      expect(productGateway.create).not.toHaveBeenCalled()
      expect(response.statusCode).toEqual(400)
    })

    test('return an error response in gateway errors', async () => {
      const productGateway = {
        create: jest.fn().mockRejectedValue(new Error('Product gateway error.'))
      }
      const createProductInteractor = new CreateProductInteractor(productGateway)
      const response = await createProductInteractor.exec(CREATE_PRODUCT_REQUEST)

      expect(productGateway.create).toHaveBeenCalledWith(CREATE_PRODUCT_REQUEST)
      expect(response.statusCode).toEqual(400)
      expect(response.message).toEqual('Product gateway error.')
    })

    test('return a response for product creation', async () => {
      const productGateway = { create: jest.fn().mockResolvedValue() }
      const createProductInteractor = new CreateProductInteractor(productGateway)
      const response = await createProductInteractor.exec(CREATE_PRODUCT_REQUEST)

      expect(productGateway.create).toHaveBeenCalledWith(CREATE_PRODUCT_REQUEST)
      expect(response.statusCode).toEqual(201)
      expect(response.message).toEqual('Product successfully created.')
    })
  })
})
