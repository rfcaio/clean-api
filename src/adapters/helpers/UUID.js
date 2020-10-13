const uuid = require('uuid')

class UUID {
  static generate () {
    return uuid.v4()
  }

  static isNotValid (uuidToValidate) {
    return !uuid.validate(uuidToValidate)
  }
}

module.exports = UUID
