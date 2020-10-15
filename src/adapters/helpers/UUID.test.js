const uuid = require('uuid')

const UUID = require('./UUID')

jest.mock('uuid')

describe('UUID', () => {
  describe('generate', () => {
    test('return a valid version 4 uuid', () => {
      uuid.v4 = (
        jest.fn().mockReturnValue('5e392019-3d9a-463f-a5cd-a7e7e631be1c')
      )
      expect(UUID.generate()).toEqual('5e392019-3d9a-463f-a5cd-a7e7e631be1c')
    })
  })

  describe('isNotValid', () => {
    test('return false if uuid is valid', () => {
      uuid.validate = jest.fn().mockReturnValue(true)
      const result = UUID.isNotValid('5e392019-3d9a-463f-a5cd-a7e7e631be1c')
      expect(uuid.validate).toHaveBeenCalledWith('5e392019-3d9a-463f-a5cd-a7e7e631be1c')
      expect(result).toBeFalsy()
    })
  })
})
