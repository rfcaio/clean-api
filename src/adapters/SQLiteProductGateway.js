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
}

module.exports = SQLiteProductGateway
