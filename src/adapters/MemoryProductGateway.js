class MemoryProductGateway {
  constructor () {
    this._products = []
  }

  create (product) {
    return new Promise(resolve => {
      setTimeout(() => {
        this._products = [...this._products, product]
        resolve()
      }, 2000)
    })
  }

  deleteById (id) {
    return new Promise(resolve => {
      setTimeout(() => {
        this._products = this._products.filter(product => product.id !== id)
        resolve()
      }, 2000)
    })
  }

  getById (id) {
    return new Promise(resolve => {
      setTimeout(() => {
        const product = this._products.find(product => product.id === id)
        resolve(product)
      }, 2000)
    })
  }

  listAll () {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this._products)
      }, 2000)
    })
  }
}

module.exports = MemoryProductGateway
