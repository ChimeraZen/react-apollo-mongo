import axios from 'axios'

const API_URL = 'http://localhost:8000/graphql'

const user = async variables => {
  return await axios.post(API_URL, {
    query: `
      query ($id: ID!) {
        user(id: $id) {
          id
          username
          email
          role
        }
      }
    `,
    variables,
  })
}

const signUp = async variables => {
  return await axios.post(API_URL, {
    query: `
      mutation (
        $username: String!, 
        $email: String!, 
        $password: String!, 
        $role: String!
      ) {
        signUp(
          username: $username, 
          email: $email, 
          password: $password, 
          role: $role
        ) {
          token
        }
      }
    `,
    variables,
  })
}

const signIn = async variables => {
  return await axios.post(API_URL, {
    query: `
      mutation ($login: String!, $password: String!) {
        signIn(login: $login, password: $password) {
          token
        }
      }
    `,
    variables,
  })
}

const deleteUser = async (variables, token) => {
  return await axios.post(
    API_URL,
    {
      query: `
        mutation ($id: ID!) {
          deleteUser(id: $id)
        }
      `,
      variables,
    },
    {
      headers: {
        'x-token': token,
      },
    }
  )
}

module.exports = {
  user,
  signUp,
  signIn,
  deleteUser
}