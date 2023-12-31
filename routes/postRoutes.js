const express = require('express');
const postController = require('../controllers/posts');

const postRouter = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

postRouter.post('/', authMiddleware.verifyToken,postController.createPost);








module.exports = postRouter;