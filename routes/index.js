const express = require('express');
const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')
const postController = require('../controllers/postController.js')
const imageMiddle = require('../middleware/imageMiddleware')

const router = express.Router();
router.get('/', homeController.index);
router.get('/users/login', userController.login);
router.get('/users/register', userController.register);
router.post('/users/register', userController.registerAction);
router.post('/users/login', userController.loginAction);

router.get('/post/add', postController.add);
router.post('/post/add',
    imageMiddle.upload,
    imageMiddle.resize,
    postController.addAction
);
  
router.get('/post/:slug/edit', postController.edit);
router.post('/post/:slug/edit', 
    postController.editAction,
    imageMiddle.upload,
    imageMiddle.resize, 
);
router.get('/post/:slug', postController.view);

module.exports = router;   