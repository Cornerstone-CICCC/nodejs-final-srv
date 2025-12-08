// src/server.ts

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from 'http'
import { Server } from 'socket.io'
import connectDB from './config/db'
import authRoutes from './routes/auth.routes'
import profileRoutes from './routes/profile.routes'
import roomRoutes from './routes/room.routes'
import messageRoutes from './routes/message.routes'
import { registerChatHandlers } from './sockets/chat.socket' // ✅ Integración modular del socket

const app = express()

// ───────────────────────────────────────────────────────────
// MIDDLEWARE
// ───────────────────────────────────────────────────────────
app.use(cors({
  origin: 'http://localhost:5173', // ✅ Frontend URL (Vite)
  credentials: true,               // ✅ Necesario para cookies cross-origin
}))

// 🛡️ Middleware para prevenir errores si el body JSON viene vacío
app.use((req, res, next) => {
  if (
    ['POST', 'PUT', 'PATCH'].includes(req.method) &&
    req.headers['content-type']?.includes('application/json') &&
    req.headers['content-length'] === '0'
  ) {
    return res.status(400).json({ error: 'Empty JSON body' })
  }
  next()
})

app.use(express.json())
app.use(cookieParser())

// ───────────────────────────────────────────────────────────
// HTTP ROUTES
// ───────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/messages', messageRoutes)

app.get('/', (_, res) => {
  res.send('✅ API is running')
})

// ───────────────────────────────────────────────────────────
// SOCKET.IO
// ───────────────────────────────────────────────────────────
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})

// ✅ Modular: Manejadores de sockets (chat, eventos, etc.)
registerChatHandlers(io)

// ───────────────────────────────────────────────────────────
// DATABASE & SERVER LAUNCH
// ───────────────────────────────────────────────────────────
connectDB()

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
