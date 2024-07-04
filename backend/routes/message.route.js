import express from 'express'
import { getMessageBetweenTwoUsers, sendMessageToUser } from '../controller/message.controller.js'
import { protectedRoute } from '../middlewares/protectRoute.js'

const router = express.Router()

// SEND MESSAGE ROUTE
router.post('/send/:recieverId', protectedRoute, sendMessageToUser)
router.get('/:userToChatId', protectedRoute, getMessageBetweenTwoUsers)

export default router
