const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/protect');

const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    addMember,
    removeMember
} = require('../controllers/projectController');

const {
    createProjectRules,
    updateProjectRules
} = require('../validators/projectValidator');

const { validate } = require('../middlewares/validate');


//  Get all projects
router.get('/',protect, getProjects);


//  Create new project
router.post('/',protect, createProjectRules , validate , createProject);


//  Get single project
router.get('/:id',protect, getProjectById);


//  Update project
router.patch('/:id',protect, updateProjectRules, validate , updateProject);


//  Delete project
router.delete('/:id',protect, deleteProject);


//  Add project member
router.post('/:id/members',protect, addMember);


//  Remove project member
router.delete('/:id/members/:userId',protect, removeMember);


module.exports = router;