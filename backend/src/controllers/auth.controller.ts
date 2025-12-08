// src/controllers/auth.controller.ts
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model'
import { AuthRequest } from '../middleware/auth.middleware'

const COOKIE_NAME = 'token'

// 🎨 UI HOOK: estos datos son los que usarás en el frontend para mostrar el user
const publicUserFields = '_id username email createdAt'

const createToken = (userId: string) => {
  const secret = process.env.JWT_SECRET

  // Validación estricta
  if (!secret) {
    console.error('❌ ERROR: JWT_SECRET not set in .env – token cannot be generated.')
    throw new Error('JWT_SECRET not set in environment variables')
  }

  try {
    return jwt.sign({ userId }, secret, {
      expiresIn: '7d',
    })
  } catch (err) {
    console.error('❌ JWT Sign Error:', err)
    throw new Error('Token generation failed')
  }
}


export const AuthController = {
  // POST /api/auth/register
  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' })
      }

      const existing = await User.findOne({ username })
      if (existing) {
        return res.status(409).json({ error: 'Username already taken' })
      }

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const user = await User.create({
        username,
        email,
        passwordHash,
      })

      const token = createToken(user._id.toString())

      res
        .cookie(COOKIE_NAME, token, {
          httpOnly: true,
          sameSite: 'lax',
          secure: false, // 🔐 cambiar a true en producción con HTTPS
        })
        .status(201)
        .json({
          message: 'User registered successfully',
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
          },
        })
    } catch (err) {
      console.error('Register error:', err)
      res.status(500).json({ error: 'Error registering user' })
    }
  },

  // POST /api/auth/login
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' })
      }

      const user = await User.findOne({ username })
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      const match = await bcrypt.compare(password, user.passwordHash)
      if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      const token = createToken(user._id.toString())

      res
        .cookie(COOKIE_NAME, token, {
          httpOnly: true,
          sameSite: 'lax',
          secure: false,
        })
        .json({
          message: 'Login successful',
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
          },
        })
    } catch (err) {
      console.error('Login error:', err)
      res.status(500).json({ error: 'Error logging in' })
    }
  },

  // GET /api/auth/me
  async me(req: AuthRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ error: 'Not authenticated' })
      }

      const user = await User.findById(req.userId).select(publicUserFields)
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      res.json({ user })
    } catch (err) {
      console.error('Me error:', err)
      res.status(500).json({ error: 'Error getting user' })
    }
  },

  // POST /api/auth/logout
  async logout(req: Request, res: Response) {
    res
      .clearCookie(COOKIE_NAME)
      .json({ message: 'Logged out successfully' })
  },
}
