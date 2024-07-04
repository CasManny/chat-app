import express from 'express'
import { loginUser, logoutUser, signupUser } from '../controller/auth.controller.js'

const router = express.Router()

router.post('/login',loginUser)
router.post('/logout', logoutUser)
router.post('/sign-up', signupUser)

export default router