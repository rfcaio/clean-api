const sqlite3 = require('sqlite3').verbose()

class SQLiteProductGateway {
  constructor (databaseFileName = 'product.db') {
    this._database = new sqlite3.Database(databaseFileName, error => {
      if (error) {
        throw new Error(error.message)
      }
    })

    this._database.run(
      `
        CREATE TABLE IF NOT EXISTS product (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          price REAL NOT NULL
        )
      `,
      error => error && console.log(error)
    )
  }

  create (product) {
    const INSERT_PRODUCT_QUERY = 'INSERT INTO product (id, name, price) VALUES (?, ?, ?)'

    return new Promise((resolve, reject) => {
      const { id, name, price } = product
      this._database.run(INSERT_PRODUCT_QUERY, [id, name, price], error => {
        error ? reject(new Error('Server error occurred.')) : resolve()
      })
    })
  }

  deleteById (id) {
    return new Promise((resolve, reject) => {
      // FIXME: an inexistent product should not be deleted
      this._database.run('DELETE FROM product WHERE id = ?', [id], error => {
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

  updateById (product) {
    const UPDATE_PRODUCT_BY_ID_QUERY = 'UPDATE product SET name = ?, price = ? WHERE id = ?'

    return new Promise((resolve, reject) => {
      const { id, name, price } = product
      // FIXME: an inexistent product should not be updated
      this._database.run(UPDATE_PRODUCT_BY_ID_QUERY, [name, price, id], error => {
        error ? reject(new Error('Server error occurred.')) : resolve()
      })
    })
  }
}

module.exports = SQLiteProductGateway
