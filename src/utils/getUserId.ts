import { ContextParameters } from 'graphql-yoga/dist/types'
import { verifyToken } from './jwt'

interface tokenDecoded {
  iat: Number
  exp: Number
  id: String
}

const getUserId = (request: ContextParameters): number => {
  const header = request.request.headers.authorization

  if (!header) {
    throw new Error('You are not authorized')
  }

  const token = header.replace('Bearer ', '')

  const decoded: tokenDecoded = verifyToken(token) as tokenDecoded

  return +decoded.id
}

export default getUserId
