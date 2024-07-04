export const fetchUserProfile = async (req, res) => {
    try {
        const user = req.user
        user.password = null
        return res.status(200).json({user: user})
    } catch (error) {
       console.log(`Error in fetchUserprofile controller: ${error.message}`) 
    }
}