class Product {
  constructor ({ id, name, price }) {
    if (name.length < 6) {
      throw new Error('Product name must have at least six characters.')
    }

    if (price <= 0) {
      throw new Error('Product price must be a number greater than zero.')
    }

    this._id = id
    this._name = name
    this._price = price
  }

  get id () {
    return this._id
  }

  get name () {
    return this._name
  }

  get price () {
    return this._price
  }
}

module.exports = Product
