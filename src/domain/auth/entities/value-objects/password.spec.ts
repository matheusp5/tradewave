import { Password } from '@/domain/auth/entities/value-objects/password'
import { BadRequestError } from '@/core/errors/bad-request.error'
import bcrypt from 'bcrypt'

describe('Password', () => {
  describe('createNewPassword', () => {
    it('should create a new Password instance with a valid password', () => {
      const password = 'validpassword'

      const newPassword = Password.createNewPassword(password)

      expect(newPassword).toBeInstanceOf(Password)
    })

    it('should throw BadRequestError for invalid password', () => {
      expect(() => {
        Password.createNewPassword('short')
      }).toThrow(BadRequestError)
    })
  })

  describe('loadPassword', () => {
    it('should load an existing Password instance from a hash', () => {
      const hash = 'existinghash'
      const loadedPassword = Password.loadPassword(hash)

      expect(loadedPassword).toBeInstanceOf(Password)
      expect(loadedPassword.hash).toBe(hash)
    })
  })

  describe('comparePasswords', () => {
    it('should return true for matching passwords', async () => {
      const plainTextPassword = 'password'
      const passwordInstance = Password.createNewPassword(plainTextPassword)

      const result = await passwordInstance.comparePasswords(plainTextPassword)
      expect(result).toBe(true)
    })

    it('should return false for non-matching passwords', async () => {
      const firstPassword = 'password'
      const secondPassword = 'password2'
      const passwordInstance = Password.createNewPassword(firstPassword)

      const result = await passwordInstance.comparePasswords(secondPassword)
      expect(result).toBe(false)
    })
  })

  describe('isPasswordValid', () => {
    it('should return true for a valid password', () => {
      const password = 'validpassword'
      const isValid = Password['isPasswordValid'](password)

      expect(isValid).toBe(true)
    })

    it('should return false for an invalid password', () => {
      const password = 'short'
      const isValid = Password['isPasswordValid'](password)

      expect(isValid).toBe(false)
    })
  })
})
