import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { Message } from '../models/message.model'
import { AuthRequest } from '../middleware/auth.middleware'

export const MessageController = {
  // POST /api/messages
  async sendMessage(req: AuthRequest, res: Response) {
    try {
      const { roomId, content } = req.body
      const senderId = req.userId

      if (!senderId) {
        return res.status(401).json({ error: 'Not authenticated' })
      }

      if (!roomId || !mongoose.Types.ObjectId.isValid(roomId)) {
        return res.status(400).json({ error: 'Invalid or missing roomId' })
      }

      if (!content) {
        return res.status(400).json({ error: 'Message content is required' })
      }

      const message = await Message.create({
        roomId,
        sender: senderId,
        content,
      })

      res.status(201).json({ message })
    } catch (err) {
      console.error('❌ Send message error:', err)
      res.status(500).json({ error: 'Failed to send message' })
    }
  },

  // GET /api/messages/:roomId
  async getMessagesByRoom(req: Request, res: Response) {
    try {
      const { roomId } = req.params

      if (!mongoose.Types.ObjectId.isValid(roomId)) {
        return res.status(400).json({ error: 'Invalid room ID' })
      }

      const messages = await Message.find({ roomId })
        .populate('sender', 'username')
        .sort({ createdAt: 1 }) // Oldest first

      res.json({ messages })
    } catch (err) {
      console.error('❌ Get messages error:', err)
      res.status(500).json({ error: 'Failed to fetch messages' })
    }
  },
}
