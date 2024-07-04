import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.chat_token
        if (!token) {
            return res.status(404).json({error: "Login or register to access a chat token"})
        }
        const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!userId) {
            return res.status(404).json({error: "user not authorized. Login or register!"})
        }

        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(404).json({errro: "User not found"})
        }
        req.user = user
        next()

    } catch (error) {
        console.log(`Error in protecedRoute middleware => ${error.message}`) 
        return res.status(500).json({error: "Internal Server Error"})
    }
}