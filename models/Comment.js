const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    issue:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Issue'
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    body:{
        type: String,
        required: true,
        maxlength : 2000
    },
    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment',
        default: null
    }
},{timestamps: true , versionKey: false});

commentSchema.index({issue: 1});

module.exports = mongoose.model('Comment',commentSchema);