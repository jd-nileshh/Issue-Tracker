const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { requestLogger } = require('./middlewares/requestLogger');
const { requestId } = require('./middlewares/requestId');
const { sanitise } = require('./middlewares/sanitise');
const { generalLimiter, authLimiter } = require('./middlewares/rateLimiter');
const mongoSanitize = (req, res, next) => {

    const sanitize = (obj) => {

        for (let key in obj) {

            if (key.startsWith('$') || key.includes('.')) {
                delete obj[key];
            }

            if (
                typeof obj[key] === 'object' &&
                obj[key] !== null
            ) {
                sanitize(obj[key]);
            }
        }
    };

    sanitize(req.body);
    sanitize(req.query);
    sanitize(req.params);

    next();
};



const app = express();

app.use(express.json({
    limit: '50kb'
}));


app.use(express.urlencoded({extended: true}));
app.use(mongoSanitize);
app.use(generalLimiter);
app.use(sanitise);
app.use(cors());
app.use(helmet());
app.use(requestId);
app.use(requestLogger);

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


const { notFound } = require('./middlewares/notFound');

const { errorHandler } = require('./middlewares/errorHandler');

app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth/register', authLimiter);


app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/projects',projectRoutes);
app.use('/api/v1/issues',issueRoutes);

app.use('/api/v1/issues/:issueId/comments',commentRoutes);
app.use('/api/v1/projects/:projectId/labels',labelRoutes);






app.use(notFound);
app.use(errorHandler);




module.exports = app;