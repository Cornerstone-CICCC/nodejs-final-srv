import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { Room } from '../models/room.model'
import { AuthRequest } from '../middleware/auth.middleware'

export const RoomController = {
  // POST /api/rooms
  async createRoom(req: AuthRequest, res: Response) {
    try {
      const { name } = req.body
      const userId = req.userId

      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' })
      }

      if (!name) {
        return res.status(400).json({ error: 'Room name is required' })
      }

      const creatorId = new mongoose.Types.ObjectId(userId)

      const room = await Room.create({
        name,
        createdBy: creatorId,
        members: [creatorId],
      })

      res.status(201).json({ message: 'Room created', room })
    } catch (err) {
      console.error('❌ Create room error:', err)
      res.status(500).json({ error: 'Failed to create room' })
    }
  },

  // GET /api/rooms
  async listRooms(_req: Request, res: Response) {
    try {
      const rooms = await Room.find()
        .populate('createdBy', 'username')
        .populate('members', 'username')

      res.json({ rooms })
    } catch (err) {
      console.error('❌ List rooms error:', err)
      res.status(500).json({ error: 'Failed to fetch rooms' })
    }
  },

  // GET /api/rooms/:id
  async getRoomById(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid room ID' })
      }

      const room = await Room.findById(id)
        .populate('createdBy', 'username')
        .populate('members', 'username')

      if (!room) {
        return res.status(404).json({ error: 'Room not found' })
      }

      res.json({ room })
    } catch (err) {
      console.error('❌ Get room error:', err)
      res.status(500).json({ error: 'Failed to get room' })
    }
  },

  // POST /api/rooms/:id/join
  async joinRoom(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params
      const userId = req.userId

      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' })
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid room ID' })
      }

      const room = await Room.findById(id)

      if (!room) {
        return res.status(404).json({ error: 'Room not found' })
      }

      const alreadyJoined = room.members.some(memberId =>
        memberId.toString() === userId
      )

      if (alreadyJoined) {
        return res.status(400).json({ error: 'User already joined this room' })
      }

      room.members.push(new mongoose.Types.ObjectId(userId))
      await room.save()

      res.status(200).json({ message: 'Successfully joined room', room })
    } catch (err) {
      console.error('❌ Join room error:', err)
      res.status(500).json({ error: 'Failed to join room' })
    }
  },

  // DELETE /api/rooms/:id
  async deleteRoom(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId
      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid room ID' })
      }

      const room = await Room.findById(id)

      if (!room) {
        return res.status(404).json({ error: 'Room not found' })
      }

      if (room.createdBy.toString() !== userId) {
        return res.status(403).json({ error: 'Only the creator can delete this room' })
      }

      await room.deleteOne()

      res.status(200).json({ message: 'Room deleted successfully' })
    } catch (err) {
      console.error('❌ Delete room error:', err)
      res.status(500).json({ error: 'Failed to delete room' })
    }
  },

  // POST /api/rooms/:id/leave
  async leaveRoom(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId
      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid room ID' })
      }

      const room = await Room.findById(id)

      if (!room) {
        return res.status(404).json({ error: 'Room not found' })
      }

      const isMember = room.members.some(memberId =>
        memberId.toString() === userId
      )

      if (!isMember) {
        return res.status(400).json({ error: 'You are not a member of this room' })
      }

      room.members = room.members.filter(
        memberId => memberId.toString() !== userId
      )

      await room.save()

      res.status(200).json({ message: 'You left the room successfully' })
    } catch (err) {
      console.error('❌ Leave room error:', err)
      res.status(500).json({ error: 'Failed to leave room' })
    }
  },
}
