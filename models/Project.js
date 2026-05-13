const mongoose = require('mongoose');
const User = require('./User');

const memberSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required : true
    },
    role:{
        type: String,
        enum:["owner","developer","maintainer","viewer"],
        required: true
    }
},{_id:false});

const projectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    description:{
        type: String
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status:{
        type: String,
        enum: ["active","archived"],
        default:"active"
    },
    members:[memberSchema]
},{timestamps: true , versionKey: false});

module.exports = mongoose.model('Project', projectSchema)