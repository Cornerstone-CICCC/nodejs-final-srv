// src/routes/profile.routes.ts
import { Router } from 'express'
import { getProfile, updateProfile } from '../controllers/profile.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()

router.get('/me', authMiddleware, getProfile)
router.put('/me', authMiddleware, updateProfile)

export default router
