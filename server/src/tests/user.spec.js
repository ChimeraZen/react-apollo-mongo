import { expect } from 'chai'
import { userApi } from './api'

const testUser = {
  username: 'tester',
  email: 'test@test.com',
  role: 'STAFF',
  password: 'ababab',
}

describe('users', () => {
  describe('user(id: String!): User', () => {
    it('returns a user when user can be found', async () => {
      const expectedResult = {
        data: {
          user: {
            id: '5c73415df6724a2bcc98c960',
            username: 'rwieruch',
            email: 'rwieruch@ramtest.com',
            role: 'ADMIN',
          },
        },
      }

      const result = await userApi.user({ id: '5c73415df6724a2bcc98c960' })
      
      expect(result.data).to.eql(expectedResult)
    })
    it('returns null when user cannot be found', async () => {
      const result = await userApi.user({ id: '42' })
      const { errors } = result.data
      const expectedResult = {
        errors,
        data: {
          user: null,
        },
      }

      expect(result.data).to.eql(expectedResult)
    })
  })
  describe('signIn(login: String! password: String!): Token!', () => {
    it('returns an error when login is empty', async () => {
      
      const {data: { errors }} = await userApi.signIn({
        login: '',
        password: 'aaaaa',
      })
      
      const expectedResult = 'A username or email is required'
      const parsingErrors = errors[0]
      
      expect(parsingErrors.message).to.eql(expectedResult)
    })
    it('returns an error when password is empty', async () => {
      
      const {data: { errors }} = await userApi.signIn({
        login: 'aaaaa',
        password: '',
      })
      
      const expectedResult = 'A password is required'
      const parsingErrors = errors[0]
      
      expect(parsingErrors.message).to.eql(expectedResult)
    })
    it('returns an error when login is incorrect', async () => {
      
      const {data: { errors }} = await userApi.signIn({
        login: 'aaa',
        password: 'aaaaa',
      })
      
      const expectedResult = 'No user found with these credentials'
      
      const parsingErrors = errors[0]
      
      expect(parsingErrors.message).to.eql(expectedResult)
    })
    it('returns token when login is correct', async () => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await userApi.signIn({
        login: 'cardiego',
        password: 'ababab',
      })
      
      expect(token)
    })
  })
  describe(`signUp(username: String! email: String! role: String! password: String! ): Token!`, () => {
    /* Username */
    it('returns an error when username is empty', async () => {
      
      const user = {...testUser}
      user.username = ''
      
      const {data: { errors }} = await userApi.signUp(user)
      
      const expectedResult = 'User must have a username'
      const parsingErrors = errors[0].extensions.exception.errors
      
      expect(parsingErrors.username.message).to.eql(expectedResult)
    })
    
    /* Email */
    it('returns an error when email already exists', async () => {
      const user = {...testUser}
      user.username = 'rwieruch'
      user.email = 'rwieruch@ramtest.com'
      
      const {data: { errors }} = await userApi.signUp(user)
      
      const expectedResult = 'User already exists'
      
      expect(errors[0].message).to.eql(expectedResult)
    })
    it('returns an error when email is empty', async () => {
      const user = {...testUser}
      user.email = ''
      
      const {data: { errors }} = await userApi.signUp(user)
      
      const expectedResult = 'User must have an email'
      const parsingErrors = errors[0].extensions.exception.errors
      
      expect(parsingErrors.email.message).to.eql(expectedResult)
    })
    it('returns an error when email is not an email', async () => {
      const user = {...testUser}
      user.email = 'tested'
      
      const {data: { errors }} = await userApi.signUp(user)
      
      const expectedResult = 'Email must be a valid email address'
      const parsingErrors = errors[0].extensions.exception.errors
      
      expect(parsingErrors.email.message).to.eql(expectedResult)
    })
    
    /* Password */
    it('returns an error when password is empty', async () => {
      
      const user = {...testUser}
      user.password = ''
      
      const {data: { errors }} = await userApi.signUp(user)
      
      const expectedResult = 'User must have a password'
      const parsingErrors = errors[0].extensions.exception.errors
      
      expect(parsingErrors.password.message).to.eql(expectedResult)
    })
    
    it('returns an error when user cannot be created', async () => {
      
      const user = {
        username: '',
        email: '',
        role: '',
        password: ''
      }
      
      const {
        data: { errors },
      } = await userApi.signUp(user)
      
      const expectedResult = 'user validation failed'
      const parsingErrors = errors[0].extensions.exception
      
      expect(parsingErrors._message).to.eql(expectedResult)
    })
    /* it('returns token when signUp is successful', async () => {
      const {
        data: {
          data: {
            signUp: { token },
          },
        },
      } = await userApi.signUp(testUser)
      
      expect(token)
    }) */
  })
  describe('deleteUser(id: String!): Boolean!', () => {
    it('returns an error because only admins can delete a user', async () => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await userApi.signIn({
        login: 'cardiego',
        password: 'ababab',
      })

      const {
        data: { errors },
      } = await userApi.deleteUser({ id: '5c724dbb5bf803321420568e' }, token)
      
      expect(errors[0].message).to.eql('Not authorized as admin.')
    })
    it('returns false when a user fails to be deleted', async () => {
      const expectedResult = {
        data: {
          deleteUser: false
        }
      }
      
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await userApi.signIn({
        login: 'rwieruch',
        password: 'abcde54321',
      })

      const result = await userApi.deleteUser({ id: '5c73546a47977a1bec697314' }, token)
      const { data } = result
      
      expect(data).to.eql(expectedResult)
    })
  })
})