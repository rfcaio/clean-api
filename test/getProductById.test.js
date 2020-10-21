const request = require('supertest')

const { productGateway, server } = require('../src/main/express')

const DEFAULT_PRODUCT = {
  id: '5e392019-3d9a-463f-a5cd-a7e7e631be1c',
  name: 'Arroz Alteza 1Kg',
  price: 6.49
}

describe('/product/:id GET', () => {
  beforeEach(async () => await productGateway.create(DEFAULT_PRODUCT))

  beforeAll(async () => await productGateway.deleteAll())

  afterEach(async () => await productGateway.deleteAll())

  test('reject product with an invalid id', async () => {
    const response = await request(server).get('/product/1')
    expect(response.status).toEqual(400)
    expect(response.body.message).toEqual('Product ID must be a valid UUID.')
  })

  test('return a product not found message', async () => {
    const response = await (
      request(server).get('/product/aaee571c-ad99-4344-b75a-57b6a1a66a28')
    )
    expect(response.status).toEqual(404)
    expect(response.body.message).toEqual('Product not found.')
  })

  test('get product by id successfully', async () => {
    const response = await (
      request(server).get('/product/5e392019-3d9a-463f-a5cd-a7e7e631be1c')
    )
    expect(response.status).toEqual(200)
    expect(response.body).toEqual(DEFAULT_PRODUCT)
  })
})
