require('dotenv').config();

const mongoose = require('mongoose');
const config = require('../config/config');

const User = require('../models/User');
const Project = require('../models/Project');
const Label = require('../models/Label');
const Issue = require('../models/Issue');
const Comment = require('../models/Comment');
const ActivityLog = require('../models/ActivityLog');


async function seedDatabase(){
    try{
        await mongoose.connect(config.MONGODB_URI);
        console.log('MongoDB connected for Seeding');

        await ActivityLog.deleteMany({});
        await Comment.deleteMany({});
        await Issue.deleteMany({});
        await Label.deleteMany({});
        await Project.deleteMany({});
        await User.deleteMany({});

        console.log('Database cleared');

        //Users create
const adminUser = await User.create({
    name: 'Admin User',
    email: 'admin123@example.com',
    password: '123456',
    role: 'admin'
});

const memberUser = await User.create({
    name:'Member User',
    email:'member123@example.com',
    password:'123456',
    role: 'member'
});


//Project create
const project = await Project.create({
    title : 'Issue Tracker Project',
    description:'Sample project for seeding',
    owner: adminUser._id,

    members:[
        {
            user:adminUser._id,
            role:'owner'
        },
        {
            user:memberUser._id,
            role:'developer'
        }
    ]
});


//create label
const labels = await Label.create([
    {
        name: 'Bug',
        color:"#FF0000",
        project: project._id
    },
    {
        name:'Frontend',
        color: "#0000FF",
        project: project._id
    },
    {
        name:'Urgent',
        color:"#FFA500",
        project: project._id
    }
]);


// create issue
const issues = await Issue.create([
    {
        title: 'Fix login Bug',
        descriptin :'Login not working properly',
        type:'bug',
        priority:'high',
        status:'open',
        project: project._id,
        reporter:adminUser._id,
        assignee: memberUser._id,
        labels:[labels[0]._id]
    },
    {
        title:'Add dashboard UI',
        description: 'Create frontend dashboard',
        type:'feature',
        status:'in-progress',
        priority:'medium',
        project:project._id,
        reporter:adminUser._id,
        assignee:memberUser._id,
        labels:[labels[1]._id]
    },
    {
        title:'Improve performance',
        description:'optimise queries',
        type:'improvement',
        status:'in-review',
        priority:'low',
        project: project._id,
        reporter: adminUser._id,
        assignee: memberUser._id,
        labels:[labels[2]._id]

    },
    {
        title:'Setup logging',
        description:'Add activity logging',
        type:'task',
        status:'resolved',
        priority:'critical',
        project: project._id,
        reporter:adminUser._id,
        assignee:memberUser._id,
        labels:[labels[0]._id , labels[1]._id]
    }
]);


//create comments
const Comments = await Comment.create([
    {
        issue: issues[0]._id,
        author: memberUser._id,
        body : 'I am working on this bug'
    },
    {
        issue: issues[0]._id,
        author: memberUser._id,
        body: 'Fix will be pushed soon'
    }
]);


// log counts

const userCount = await User.countDocuments();
const projectCount = await Project.countDocuments();
const labelCount = await Label.countDocuments();
const issueCount = await Issue.countDocuments();
const commentCount = await Comment.countDocuments();
const activityLogCount = await ActivityLog.countDocuments();

console.log('Users : ',userCount);
console.log('Projects : ',projectCount);
console.log('Labels : ',labelCount);
console.log('Issues : ',issueCount);
console.log('Comments : ',commentCount);
console.log('ActivityLogs : ',activityLogCount);

await mongoose.disconnect();
console.log('Seeding successfully completed');

    }catch(error){
        console.error('Seeding failed: ',error.message);
        process.exit(1);
    }
}




seedDatabase().catch(function(error){
    console.error('Seeding script error:' , error.message);
    process.exit(1);
});