// src/routes/auth.routes.ts
import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()

// 🎨 UI HOOK: ruta para formulario de registro
router.post('/register', AuthController.register)

// 🎨 UI HOOK: ruta para formulario de login
router.post('/login', AuthController.login)

// 🎨 UI HOOK: usada al cargar la página para saber si el user ya está logueado
router.get('/me', authMiddleware, AuthController.me)

// 🎨 UI HOOK: botón "logout" en el frontend
router.post('/logout', authMiddleware, AuthController.logout)

export default router
