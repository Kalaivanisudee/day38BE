const  Post  = require("../models/post");

const postController = {
  createPost: (request, response) => {
    try {
      //get the user id from the request
      const userId = request.userId;

      const { title, description } = request.body;

      // create post
      const post = new Post({
        title,
        description,
        user: userId,
      });
      //save the post
      post.save();

      //retutn the post
      return response.json({ message: "post created successfully", post });
    } catch (error) {
      return response.json({ error: "Token is invalid" });
    }
  },
};

module.exports = postController;
