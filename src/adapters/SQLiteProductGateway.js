const sqlite3 = require('sqlite3').verbose()

class SQLiteProductGateway {
  constructor () {
    this._database = new sqlite3.Database('product.db', error => {
      if (error) {
        throw new Error(error.message)
      }
    })

    this._database.run(
      `
        CREATE TABLE IF NOT EXISTS product (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          price REAL NOT NULL
        )
      `,
      error => error && console.log(error)
    )
  }

  create (product) {
    return new Promise((resolve, reject) => {
      const { name, price } = product
      const query = 'INSERT INTO product (name, price) VALUES (?, ?)'

      this._database.run(query, [name, price], error => {
        error ? reject(new Error('Server error occurred.')) : resolve()
      })
    })
  }

  getById (id) {
    const SELECT_PRODUCT_BY_ID_QUERY = 'SELECT * FROM product WHERE id = ?'

    return new Promise((resolve, reject) => {
      this._database.get(SELECT_PRODUCT_BY_ID_QUERY, id, (error, product) => {
        error ? reject(new Error('Server error occurred.')) : resolve(product)
      })
    })
  }

  listAll () {
    return new Promise((resolve, reject) => {
      this._database.all('SELECT * FROM product', (error, products) => {
        error ? reject(new Error('Server error occurred.')) : resolve(products)
      })
    })
  }
}

module.exports = SQLiteProductGateway
