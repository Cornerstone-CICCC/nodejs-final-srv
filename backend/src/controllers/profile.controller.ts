// src/controllers/profile.controller.ts
import { Request, Response } from 'express'
import { User } from '../models/user.model'
import { AuthRequest } from '../middleware/auth.middleware'

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select('-passwordHash')
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (err) {
    console.error('GET /profile/me error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const updates = {
      name: req.body.name,
      bio: req.body.bio,
      location: req.body.location,
      website: req.body.website,
      avatar: req.body.avatar,
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-passwordHash')

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(updatedUser)
  } catch (err) {
    console.error('PUT /profile/me error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}
