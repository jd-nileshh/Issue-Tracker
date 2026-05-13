const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    color:{
        type:String,
        required: true
    },
    description:{
        typr: String
    },
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required : true
    }
},{timestamps: true , versionKey: false});

labelSchema.index({project: 1 , name : 1} , {unique: true});

module.exports = mongoose.model('Label', labelSchema);