const express = require('express');
const router = express.Router();

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
router.get('/', getProjects);


//  Create new project
router.post('/', createProjectRules , validate , createProject);


//  Get single project
router.get('/:id', getProjectById);


//  Update project
router.patch('/:id', updateProjectRules, validate , updateProject);


//  Delete project
router.delete('/:id', deleteProject);


//  Add project member
router.post('/:id/members', addMember);


//  Remove project member
router.delete('/:id/members/:userId', removeMember);


module.exports = router;