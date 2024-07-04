import express from 'express'
import { sendMessageToUser } from '../controller/message.controller.js'
import { protectedRoute } from '../middlewares/protectRoute.js'

const router = express.Router()

// SEND MESSAGE ROUTE
router.post('/send/:recieverId',protectedRoute, sendMessageToUser)

export default router
