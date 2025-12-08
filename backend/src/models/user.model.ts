// src/models/user.model.ts
import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  username: string
  email?: string
  passwordHash: string
  createdAt: Date

  name?: string
  bio?: string
  location?: string
  website?: string
  avatar?: string
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Campos de perfil opcionales
  name: { type: String, trim: true },
  bio: { type: String, trim: true },
  location: { type: String, trim: true },
  website: { type: String, trim: true },
  avatar: { type: String, trim: true },
})

export const User = mongoose.model<IUser>('User', userSchema)
