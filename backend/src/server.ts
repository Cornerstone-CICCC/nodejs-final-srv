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
// import roomRoutes from './routes/room.routes'
// import { registerChatSocket } from './sockets/chat.socket'

const app = express()

app.use(
  cors({
    origin: true, // acepta file://, localhost, etc. durante dev
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

// Rutas HTTP
app.use('/api/auth', authRoutes)
// app.use('/api/rooms', roomRoutes)
// app.use('/api/messages', messageRoutes)

app.get('/', (req, res) => {
  res.send('Servidor funcionando ✅')
})

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
})

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id)
  // registerChatSocket(io, socket)
})

connectDB()

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
