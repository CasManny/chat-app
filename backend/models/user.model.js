import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        validate: {
            validator: function (v) {
                return v && v.length > 6;
            },
            message: 'Password must be longer than 6 characters',
        }
    },
    gender: {
        type: String,
        required: true,
        enum: ['female', 'male']
    },
    profile_picture: {
        type: String,
    }
    

}, { timestamps: true})

export const User = mongoose.models.User || mongoose.model("User", userSchema)