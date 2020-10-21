const request = require('supertest')

const { productGateway, server } = require('../src/main/express')

const DEFAULT_PRODUCT = {
  id: '5e392019-3d9a-463f-a5cd-a7e7e631be1c',
  name: 'Arroz Alteza 1Kg',
  price: 6.49
}

describe('/product GET', () => {
  beforeEach(async () => await productGateway.create(DEFAULT_PRODUCT))

  beforeAll(async () => await productGateway.deleteAll())

  afterEach(async () => await productGateway.deleteAll())

  test('list all products successfully', async () => {
    const response = await request(server).get('/product')
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({ products: [DEFAULT_PRODUCT] })
  })
})
