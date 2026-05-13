const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    avatar:{
        type: String,
    },
    role:{
        type: String,
        enum:["admin" , "member"],
        default: "member"
    },
    isActive:{
        type: Boolean,
        default: true
    }
},{timestamps: true , versionKey: false});


userSchema.pre('save', async function(){
    if(!this.isModified('password')) return ;

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
   
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User',userSchema);