const Product = require('./Product')

describe('Product', () => {
  test('throw an error if product name is less than six', () => {
    expect(() => {
      return new Product({ name: 'Arroz', price: 1.99 })
    }).toThrow('Product name must have at least six characters.')
  })

  test('throw an error if product price is less than or equal zero', () => {
    expect(() => {
      return new Product({ name: 'Arroz Alteza', price: 0 })
    }).toThrow('Product price must be a number greater than zero.')
  })

  test('create product successfully', () => {
    const product = new Product({ id: '1', name: 'Arroz Alteza', price: 1.99 })
    expect(product.id).toEqual('1')
    expect(product.name).toEqual('Arroz Alteza')
    expect(product.price).toEqual(1.99)
  })
})
