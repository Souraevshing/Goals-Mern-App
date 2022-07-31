import express from 'express'

import {
  registerUser,
  loginUser,
  getUserData,
} from '../controllers/UserController.js'
import { protect } from '../middlewares/AuthMiddleware.js'

const router = express.Router()

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/userData',protect, getUserData)

export default router
