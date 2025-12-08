// src/middleware/auth.middleware.ts
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  userId?: string
}

// Leer token desde cookie o header Authorization
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenFromCookie = req.cookies?.token as string | undefined
    const authHeader = req.headers.authorization
    const tokenFromHeader = authHeader?.startsWith('Bearer ')
      ? authHeader.slice(7)
      : undefined

    const token = tokenFromCookie || tokenFromHeader

    if (!token) {
      return res.status(401).json({ error: 'No auth token provided' })
    }

    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw new Error('JWT_SECRET not set')
    }

    const payload = jwt.verify(token, secret) as { userId: string }
    req.userId = payload.userId
    next()
  } catch (err) {
    console.error('Auth error:', err)
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
