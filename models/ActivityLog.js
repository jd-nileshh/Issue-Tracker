const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
    issue:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Issue',
        required : true
    },
    actor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    action:{
        type: String,
        required: true,
        enum:["status_changed","priority_changed","assigned","unassigned","commented"]
    },
    beforeValue:{
        type: String
    },
    afterValue:{
        type:String
    }
},{
    timestamps:{createdAt: true , updatedAt: false} , versionKey: false
});

activityLogSchema.index({issue: 1});

module.exports = mongoose.model('ActivityLog' , activityLogSchema);