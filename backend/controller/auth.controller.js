import { User } from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import {generateAndSetToken} from '../lib/generateTokenAndSet.js'

export const signupUser = async (req, res) => {
    const { full_name, username, password, confirm_password, gender } = req.body
    if (password !== confirm_password) {
        return res.status(400).json({ error: "Password do not match"})
    }
    
    try {
        const find_existing_user = await User.findOne({ username })
        if (find_existing_user) {
            return res.status(400).json({error: "username already taken"})
        }
        const boy_profile_pic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girl_profile_pic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const salt = await bcrypt.genSalt(10)
        const hashed_password = await bcrypt.hash(password, salt)
        const new_user = new User({
            full_name: full_name,
            username: username,
            password: hashed_password,
            gender: gender,
            profile_picture: gender === "male" ? boy_profile_pic : girl_profile_pic
        })
        
        const created_user = await new_user.save()
        generateAndSetToken(created_user._id, res)
        created_user.password = null
        return res.status(200).json(created_user)
    } catch (error) {
        console.log(`Error in signup controller: ${error.message}`)
        return res.status(500).json({error: "Internal server error"})
    }
}


export const logoutUser = async (req, res) => {
    try {
        res.cookie('chat_token', "", { maxAge: 0 })
        res.status(200).json({message: "logged out successfully"})
    } catch (error) {
          console.log(`Error in signup controller: ${error.message}`);
          return res.status(500).json({ error: "Internal server error" });
    }
}

export const loginUser = async (req, res, next) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username: username })
        if (!user) {
            return res.status(404).json({ error: "user does not exist"})
        }
        const verifiedPassword = await bcrypt.compare(password, user.password)
        if (!verifiedPassword) {
            return res.status(400).json({error: "password do not match"})
        } 
        user.password = null
        generateAndSetToken(user._id, res)
        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }

}