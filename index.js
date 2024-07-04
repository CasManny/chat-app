import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import { connectToDatabase } from './backend/db/connectDB.js'
import authenticationRoute from './backend/routes/auth.route.js'
import { errorHandler } from './backend/middlewares/handleError.js'
import userRoutes from './backend/routes/user.route.js'
import messageRoutes from './backend/routes/message.route.js'
dotenv.config()


const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


// ROUTES
app.use("/api/auth", authenticationRoute)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)


// ERROR MIDDLEWARE
app.use(errorHandler)

app.listen(PORT, async () => {
    console.log(`Server is connected at port http://localhost:${PORT}`)
    await connectToDatabase()
})