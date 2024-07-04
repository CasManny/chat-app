import express from 'express'
import { fetchUserProfile } from '../controller/user.controller.js'
import { protectedRoute } from '../middlewares/protectRoute.js'

const router = express.Router()

router.get('/',protectedRoute, fetchUserProfile)

export default router