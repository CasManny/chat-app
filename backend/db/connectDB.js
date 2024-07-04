import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
          dbName: "chat-app",
          bufferCommands: false,
        });

        console.log(`DB connected on host ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        
    }
}