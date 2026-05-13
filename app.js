const express = require("express");
const cors = require("cors");
const helmet = require("helmet");


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(helmet());

app.get('/api/health' , (req,res) => {
    res.json({
        success: true,
        message: "Server is running",
        timestamp: new Date()
    });
});

const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');
const issueRoutes = require('./routes/issueRoutes');
const labelRoutes = require('./routes/labelRoutes');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/projects',projectRoutes);
app.use('/api/v1/issues',issueRoutes);

app.use('/api/v1/issues/:issueId/comments',commentRoutes);
app.use('/api/v1/projects/:projectId/labels',labelRoutes);

module.exports = app;