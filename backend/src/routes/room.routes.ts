import { Router } from 'express'
import { RoomController } from '../controllers/room.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()

router.post('/', authMiddleware, RoomController.createRoom)
router.get('/', RoomController.listRooms)
router.get('/:id', RoomController.getRoomById)
router.post('/:id/join', authMiddleware, RoomController.joinRoom)
router.delete('/:id', authMiddleware, RoomController.deleteRoom)
router.post('/:id/leave', authMiddleware, RoomController.leaveRoom)


export default router
