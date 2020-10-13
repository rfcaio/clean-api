const uuid = require('uuid')

class UUID {
  static generate () {
    return uuid.v4()
  }
}

module.exports = UUID
