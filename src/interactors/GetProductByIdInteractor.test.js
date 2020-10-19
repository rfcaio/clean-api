const GetProductByIdInteractor = require('./GetProductByIdInteractor')

describe('GetProductByIdInteractor', () => {
  test('return an error response in gateway errors', async () => {
    const productGateway = {
      getById: jest.fn().mockRejectedValue(new Error('Product gateway error.'))
    }
    const getProductByIdInteractor = new GetProductByIdInteractor(productGateway)
    const response = await getProductByIdInteractor.exec('1')

    expect(productGateway.getById).toHaveBeenCalledWith('1')
    expect(response.statusCode).toEqual(400)
    expect(response.message).toEqual('Product gateway error.')
  })

  test('return an error response for product not found', async () => {
    const productGateway = { getById: jest.fn().mockReturnValue(null) }
    const getProductByIdInteractor = new GetProductByIdInteractor(productGateway)
    const response = await getProductByIdInteractor.exec('1')

    expect(productGateway.getById).toHaveBeenCalledWith('1')
    expect(response.statusCode).toEqual(404)
    expect(response.message).toEqual('Product not found.')
  })

  test('return a product by id successfully', async () => {
    const product = { id: '1', name: 'Arroz Alteza 1Kg', price: 6.49 }
    const productGateway = { getById: jest.fn().mockReturnValue(product) }
    const getProductByIdInteractor = new GetProductByIdInteractor(productGateway)
    const response = await getProductByIdInteractor.exec('1')

    expect(productGateway.getById).toHaveBeenCalledWith('1')
    expect(response.statusCode).toEqual(200)
    expect(response.product).toEqual(product)
  })
})
