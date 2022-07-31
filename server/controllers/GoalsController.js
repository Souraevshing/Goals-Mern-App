import asyncHandler from 'express-async-handler'

import GoalModel from '../models/GoalModel.js'
import UserModel from '../models/UserModel.js'

//GET_GOALS
const getGoals = asyncHandler(async (req, res) => {
  const goals = await GoalModel.find({ user: req.user.id })
  res.status(200).json(goals)
})

//CREATE_GOAL
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Text field is mandatory')
  }
  const newGoal = await GoalModel.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(newGoal)
})

//UPDATE_GOALS
const updateGoals = asyncHandler(async (req, res) => {
  const newGoal = await GoalModel.findById(req.params.id)

  if (!newGoal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  const user = await UserModel.findById(req.user.id)

  //checking if user exist, then update else return error
  if (!user) {
    res.status(401)
    throw new Error('User not exist')
  }

  //checking for user matches the goal
  if (newGoal.user.toString() !== user.id) {
    res.status(401)
    throw new Error('Unauthorized user')
  }

  const updatedGoal = await GoalModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedGoal)
})

//DELETE_GOALS
const deleteGoals = asyncHandler(async (req, res) => {
  const newGoal = await GoalModel.findById(req.params.id)

  if (!newGoal) {
    res.status(400)
    throw new Error('Goal not found')
  }

const user = await UserModel.findById(req.user.id)

//checking if user exist, then update else return error
if (!user) {
  res.status(401)
  throw new Error('User not exist')
}

//checking for user matches the goal
if (newGoal.user.toString() !== user.id) {
  res.status(401)
  throw new Error('Unauthorized user')
}

  await newGoal.remove()

  res.status(200).json({ id: req.params.id })
})

export { getGoals, setGoals, updateGoals, deleteGoals }
