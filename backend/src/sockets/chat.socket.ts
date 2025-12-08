// src/sockets/chat.socket.ts

import { Server, Socket } from 'socket.io'
import mongoose from 'mongoose'
import { Message } from '../models/message.model'

interface JoinRoomPayload {
  roomId: string
}

interface MessagePayload {
  roomId: string
  content: string
  senderId: string
}

export function registerChatHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('✅ New client connected:', socket.id)

    // 🟡 Join a chat room
    socket.on('joinRoom', ({ roomId }: JoinRoomPayload) => {
      socket.join(roomId)
      console.log(`🟡 Socket ${socket.id} joined room ${roomId}`)
    })

    // 💬 Handle incoming chat message
    socket.on('chatMessage', async ({ roomId, content, senderId }: MessagePayload) => {
      try {
        // 1. Save message to DB
        const message = await Message.create({
          roomId: new mongoose.Types.ObjectId(roomId),
          sender: new mongoose.Types.ObjectId(senderId),
          content,
        })

        // 2. Broadcast the message to others in the room
        io.to(roomId).emit('chatMessage', {
          _id: message._id,
          roomId: message.roomId,
          senderId: message.sender,
          content: message.content,
          createdAt: message.createdAt,
        })

        console.log(`📤 Message saved & emitted to room ${roomId}`)
      } catch (err) {
        console.error('❌ Failed to handle chat message:', err)
      }
    })

    // 🔌 Handle disconnect
    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id)
    })
  })
}
