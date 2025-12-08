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
// import roomRoutes from './routes/room.routes'
// import { registerChatSocket } from './sockets/chat.socket'

const app = express()

// ───────────────────────────────────────────────────────────
// MIDDLEWARE
// ───────────────────────────────────────────────────────────
app.use(cors({
  origin: true,
  credentials: true,
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
// app.use('/api/rooms', roomRoutes)

app.get('/', (_, res) => {
  res.send('✅ API is running')
})

// ───────────────────────────────────────────────────────────
// SOCKET.IO
// ───────────────────────────────────────────────────────────
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
})

io.on('connection', (socket) => {
  console.log('🟢 New socket connected:', socket.id)
  // registerChatSocket(io, socket)
})

// ───────────────────────────────────────────────────────────
// DATABASE & SERVER LAUNCH
// ───────────────────────────────────────────────────────────
connectDB()

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
