import express from 'express'

import {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} from '../controllers/GoalsController.js'
import { protect } from '../middlewares/AuthMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getGoals).post(protect, setGoals)
router.route('/:id').delete(protect, deleteGoals).put(protect, updateGoals)

export default router
