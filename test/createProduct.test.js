const request = require('supertest')

const { productGateway, server } = require('../src/main/express')

describe('product test suites', () => {
  beforeAll(async () => await productGateway.deleteAll())

  afterEach(async () => await productGateway.deleteAll())

  describe('/product POST', () => {
    test('reject product with no name', async () => {
      const response = (
        await request(server).post('/product').send({ name: '', price: 6.49 })
      )
      expect(response.status).toEqual(400)
      expect(response.body.message).toEqual('Product name should not be empty.')
    })

    test('reject product with name less than six characters', async () => {
      const response = (
        await request(server).post('/product').send({ name: 'Arroz', price: 6.49 })
      )
      expect(response.status).toEqual(400)
      expect(response.body.message)
        .toEqual('Product name must have at least six characters.')
    })

    test('reject product with no price', async () => {
      const response = (
        await request(server).post('/product').send({ name: 'Arroz Alteza 1Kg' })
      )
      expect(response.status).toEqual(400)
      expect(response.body.message).toEqual('Product price should be a number.')
    })

    test('reject product with price less than or equals zero', async () => {
      const response = await (
        request(server)
          .post('/product')
          .send({ name: 'Arroz Alteza 1Kg', price: 0 })
      )
      expect(response.status).toEqual(400)
      expect(response.body.message)
        .toEqual('Product price must be a number greater than zero.')
    })

    test('create product successfully', async () => {
      const response = await (
        request(server)
          .post('/product')
          .send({ name: 'Arroz Alteza 1Kg', price: 6.49 })
      )
      expect(response.status).toEqual(201)
      expect(response.body.message).toEqual('Product successfully created.')
    })
  })
})
