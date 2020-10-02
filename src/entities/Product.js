class Product {
  constructor ({ name, price }) {
    if (name.length < 6) {
      throw new Error('Product name must have at least 6 characters.')
    }

    if (price <= 0) {
      throw new Error('You must provide a valid price.')
    }

    this._name = name
    this._price = price
  }

  get name () {
    return this._name
  }

  get price () {
    return this._price.toFixed(2)
  }
}

module.exports = Product