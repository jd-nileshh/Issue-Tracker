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


//  Get all projects
router.get('/', getProjects);


//  Create new project
router.post('/', createProject);


//  Get single project
router.get('/:id', getProjectById);


//  Update project
router.patch('/:id', updateProject);


//  Delete project
router.delete('/:id', deleteProject);


//  Add project member
router.post('/:id/members', addMember);


//  Remove project member
router.delete('/:id/members/:userId', removeMember);


module.exports = router;