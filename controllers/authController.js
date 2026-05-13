const User = require('../models/User');

exports.register = async (req,res) => {
    try{
        const{name , email , password} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(409).json({
                success: false,
                message: 'Email is already registered'
            });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message : error.message
        });
    }
};


exports.login = async (req,res) => {
    try{

        const{email , password} = req.body;

        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        res.status(200).json({
            success: true,
            message: "Login successful",
            token : 'Token will be added in later stage',
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.getMe = async (req,res) => {
    res.status(200).json({
        success : true,
        message : 'Authentication will be added in stage 15'
    });
};


exports.logout = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    });
};