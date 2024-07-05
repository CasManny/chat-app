import { User } from "../models/user.model.js"

export const fetchUserProfile = async (req, res) => {
    try {
        const user = req.user
        user.password = null
        return res.status(200).json({user: user})
    } catch (error) {
       console.log(`Error in fetchUserprofile controller: ${error.message}`) 
    }
}

export const fetchAllUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        return res.status(200).json({users: filteredUsers})
    } catch (error) {
        console.log(`Error in fetchAllUsers controller: ${error.message}`)
        return res.status(500).json({error: "Internal Server Error"})
    }
}