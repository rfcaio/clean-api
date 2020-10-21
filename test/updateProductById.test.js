const request = require('supertest')

const { productGateway, server } = require('../src/main/express')

const DEFAULT_PRODUCT = {
  id: '5e392019-3d9a-463f-a5cd-a7e7e631be1c',
  name: 'Arroz Alteza 1Kg',
  price: 6.49
}

describe('/product/:id PUT', () => {
  beforeEach(async () => await productGateway.create(DEFAULT_PRODUCT))

  beforeAll(async () => await productGateway.deleteAll())

  afterEach(async () => await productGateway.deleteAll())

  test('reject product with no name', async () => {
    const response = await (
      request(server)
        .put('/product/5e392019-3d9a-463f-a5cd-a7e7e631be1c')
        .send({ name: '', price: 6.49 })
    )
    expect(response.status).toEqual(400)
    expect(response.body.message).toEqual('Product name should not be empty.')
  })

  test('reject product with name less than six characters', async () => {
    const response = await (
      request(server)
        .put('/product/5e392019-3d9a-463f-a5cd-a7e7e631be1c')
        .send({ name: 'Arroz', price: 6.49 })
    )
    expect(response.status).toEqual(400)
    expect(response.body.message).toEqual('Product name must have at least six characters.')
  })

  test('reject product with price less than or equals zero', async () => {
    const response = await (
      request(server)
        .put('/product/5e392019-3d9a-463f-a5cd-a7e7e631be1c')
        .send({ name: 'Arroz Alteza 1Kg', price: 0 })
    )
    expect(response.status).toEqual(400)
    expect(response.body.message)
      .toEqual('Product price must be a number greater than zero.')
  })

  test('reject product with an invalid id', async () => {
    const response = await (
      request(server)
        .put('/product/1')
        .send({ name: 'Arroz Alteza 1Kg', price: 6.49 })
    )
    expect(response.status).toEqual(400)
    expect(response.body.message).toEqual('Product ID must be a valid UUID.')
  })

  test('update product successfully', async () => {
    const response = await (
      request(server)
        .put('/product/5e392019-3d9a-463f-a5cd-a7e7e631be1c')
        .send({ name: 'Arroz Kicaldo 1Kg', price: 6.99 })
    )
    expect(response.status).toEqual(200)
    expect(response.body.message).toEqual('Product successfully updated.')
  })
})
