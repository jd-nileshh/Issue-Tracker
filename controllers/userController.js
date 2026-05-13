const User = require('../models/User');

exports.getAllUsers = async (req , res) => {
    try{
        const users = await User.find().select('-password');

        res.status(200).json({
            success: true,
            users
        });
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
};


exports.getUserById = async (req,res) => {
    try{

        const user = await User.findById(req.params.id).select('-password');
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            user
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message : error.message
        });
    }
};


exports.updateUser = async (req,res)=> {
    try{
        const {name, avatar} = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {name,avatar},
            {
                new : true,
                runValidators: true,
                select:'-password'
            }
        );

        if(!updatedUser){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user: updatedUser
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};