import { Router } from 'express'
import { MessageController } from '../controllers/message.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()

router.post('/', authMiddleware, MessageController.sendMessage)
router.get('/:roomId', MessageController.getMessagesByRoom)

export default router
