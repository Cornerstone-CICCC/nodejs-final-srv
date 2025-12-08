import mongoose, { Schema, Document } from 'mongoose'

export interface IMessage extends Document {
  roomId: mongoose.Types.ObjectId
  sender: mongoose.Types.ObjectId
  content: string
  createdAt: Date
}

const messageSchema = new Schema<IMessage>(
  {
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

export const Message = mongoose.model<IMessage>('Message', messageSchema)
