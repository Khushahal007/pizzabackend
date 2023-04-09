const express = require('express')
const router = express.Router();
const User = require('../Models/userModel');

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    try {
        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" })
        }

        // If the user doesn't exist, create a new user
        const newUser = new User({ name, email, password })
        await newUser.save()

        res.send('User Register Successfully')
    } catch (error) {
        return res.status(400).json({ message: error })
    }
})



router.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email, password: password })
        
        if (user) {
            const currentUser = { 
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id
            }
            res.send(currentUser)
        } else {
            return res.status(400).json({ message: 'User Login Failed 🛑'})
        }

    } catch (error) {
        return res.status(400).json({ message: error })
    }
})



module.exports = router