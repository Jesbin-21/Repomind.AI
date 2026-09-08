import express from "express"
import User from "../models/User.js"
const router = express.Router()
import jwt from "jsonwebtoken";



router.post("/signup", async (req,res)=>{
    
    console.log(req.body)
    const {email,password,confirmPassword} = req.body

    // Check existing user
    const existingUser = await User.findOne({ email });
    
if (existingUser) {
        return res.json({
            message: "Email already exists"
        });
    }

    const user = await User.create({
        email,
        password
    });

      res.json({
        message: "Email is available"
    });
   
    
})


router.post("/login", async (req, res) => {

    console.log(req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // User doesn't exist
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    // Wrong password
    if (user.password !== password) {
        return res.status(401).json({
            message: "Invalid password"
        });
    }

    // Create JWT
    const token = jwt.sign(
        {
            userId: user._id
        },
        "mysecretkey"
    );

    // Login successful
    return res.status(200).json({
        message: "Login Successful",
        token
    });

});
export default router