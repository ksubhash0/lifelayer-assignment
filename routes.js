const express = require('express');

const routes = express.Router();

const authMiddleware = require('./middleware/auth');

const AuthController = require('./constroller/authController');
const CandidateController = require('./constroller/candidateController');




//authenctication routes
routes.post('/auth/sigin', AuthController.signin);
routes.post('/auth/login', AuthController.login);
routes.get('/auth/verify', AuthController.verify);
routes.get('/auth/logout', authMiddleware, AuthController.logout);


//candidate routes
routes.post('/candidates/create', authMiddleware, CandidateController.create);
routes.get('/candidates/get/:page', authMiddleware, CandidateController.get);
routes.get('/candidate/getone/:id', authMiddleware, CandidateController.getById);
routes.delete('/candidate/delete/:id', authMiddleware, CandidateController.deleteOne);
routes.post('/candidate/update/:id', authMiddleware, CandidateController.update)


module.exports = routes;