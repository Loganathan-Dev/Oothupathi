import jwt from 'jsonwebtoken'
import env from '../../config/env.js'

const generateToken = (id, expiresIn = env.JWT_EXPIRE) => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: expiresIn,
  })
}

export default generateToken