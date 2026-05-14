const Project = require('../models/Project');
const User = require('../models/User');


exports.createProject = async (req,res) => {
    try{
        const{title,description} = req.body;

        const adminUser = await User.findOne({role : 'admin'});

        const project = await Project.create({
            title,
            description,
            owner: adminUser._id,

            members:[
                {
                    user: adminUser._id,
                    role: 'owner'
                }
            ]
        });
        res.status(201).json({
            success : true,
            message: 'Project created successfully',
            project
        });
    }catch(error){
        res.status(500).json({
            success : false,
            message: error.message
        });
    }
};



exports.getProjects = async(req,res) => {
    try{
        const projects = await Project.find({
            status: 'active'
        });
        res.status(201).json({
            success : true,
            projects
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message : error.message
        });
    }
};



exports.getProjectById = async (req,res) => {
    try{
        const project = await Project.findById(req.params.id)
        .populate('owner' , 'name email');

        if(!project){
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        res.status(201).json({
            success: true,
            project
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.updateProject = async (req,res) =>{
    try{
        const {title,description,status} = req.body ;

        const updateData = {
            title,
            description,
            status
        };

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new : true,
                runValidators : true
            }
        );

        if(!updatedProject){
            return res.status(404).json({
                success: false,
                message:'Project not found'
            });
        }
        res.status(201).json({
            success: true,
            messgae: 'Project updated successfully',
            project : updatedProject
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.deleteProject = async (req,res)=> {
    try{
        const deletedProject = await Project.findByIdAndDelete(
            req.params.id
        );

        if(!deletedProject){
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(204).send();
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



exports.addMember = async (req,res) => {
    try{
        const{userId , role} = req.body;

        const project = await Project.findById(req.params.id);

        if(!project){
            return res.status(404).json({
                success: true,
                message: 'Project not found'
            });
        }

        const existingMember = await project.members.find(
            member => member.user.toString() === userId
        );

        if(existingMember){
            return res.status(409).json({
                success:false,
                message:'User is already a project member'
            });
        }

        project.members.push({
            user: userId,
            role
        });

        await project.save();

        res.status(200).json({
            success: true,
            message: 'Member added successfully',
            project
        });


    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.removeMember = async (req,res) =>{
    try{
        const project = await Project.findById(req.params.id);

        if(!project){
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        project.members = project.members.filter(
            member => member.user.toString() !== req.params.userId
        );

        await project.save();
        res.status(200).json({
            succcess: true,
            message: 'Member removed successfully',
            project
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.messsage
        });
    }
}; 