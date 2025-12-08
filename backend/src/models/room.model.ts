import mongoose, { Document, Schema } from 'mongoose'

export interface IRoom extends Document {
  name: string
  createdBy: mongoose.Types.ObjectId
  createdAt: Date
  members: mongoose.Types.ObjectId[]
}

const roomSchema = new Schema<IRoom>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const Room = mongoose.model<IRoom>('Room', roomSchema)
