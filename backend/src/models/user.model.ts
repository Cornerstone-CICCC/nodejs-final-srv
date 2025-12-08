// src/models/user.model.ts
import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  username: string
  email?: string
  passwordHash: string
  createdAt: Date
}

const userSchema = new Schema<IUser>({
  // 🎨 UI HOOK: 'username' se mostrará en el chat y listas de usuarios
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // 🎨 UI HOOK: puedes mostrar/editar email en un futuro perfil
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
})

export const User = mongoose.model<IUser>('User', userSchema)
