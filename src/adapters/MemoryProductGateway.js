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
}

module.exports = MemoryProductGateway
