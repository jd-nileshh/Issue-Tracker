const Label = require('../models/Label');
const Project = require('../models/Project');

exports.createLabel = async(req,res) => {
    try{
        const projectId = req.params.projectId;

        const{
            name,
            color,
            description
        } = req.body;

        const label = await Label.create({
            name,
            color,
            description,
            project: projectId
        });

        res.status(201).json({
            success: true,
            message: ' Label created successfully',
            label
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.getLabels = async(req,res) => {
    try{

        const labels = await Label.find({
            project: req.params.projectId
        });

        res.status(200).json({
            success : true,
            labels
        });

    }catch(error){
        res.status(500).json({
            success: true,
            message: error.message
        });
    }
};



exports.updateLabel = async (req,res) => {
    try{

        const label = await Label.findById(req.params.id);
        if(!label){
            return res.status(404).json({
                success: false,
                message: 'Label not found'
            });
        }

        const{
            name,
            color,
            description
        } = req.body;

        if(name !== undefined){
            label.name = name;
        }
        if(color !== undefined){
            label.color = color;
        }
        if(description !== undefined){
            label.description = description;
        }

        await label.save();

        res.status(200).json({
            success: true,
            message : 'Label updated successfully',
            label
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




exports.deleteLabel = async (req,res) => {
    try{

        const deletedLabel = await Label.findByIdAndDelete(
            req.params.id
        );

        if(!deletedLabel){
            return res.status(404).json({
                success: false,
                message: 'Label not found'
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