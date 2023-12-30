const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const userController = {
  signup: async (request, response) => {
    try {
      //get username and password request from body
      const { username, name, password } = request.body;

      //check if username already exisit in the db
      const user = await User.findOne({ username });

      //if the username already exisit, return an error
      if (user) {
        return response.status(400).json({ error: "username already exisist" });
      }
      //if the username is unique, create a new user

      //has the password
      const PasswordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        name,
        PasswordHash,
      });

      //save the user to the database
      const savedUser = await newUser.save();

      //return the saved user
      response.json({ message: "user created", user: savedUser });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  signin: async (request, response) => {
    try {
      //get the username and password from the request body
      const { username, password } = request.body;

      //check if the user exist in the database
      const user = await User.findOne({
        username,
      });

      //if the user does not exist, return an error
      if (!user) {
        return response.json({ error: "user not found" });
      }

      //if the user exists, check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.PasswordHash);

      //if the password is incorrect, return an error
      if (!passwordMatch) {
        return response.json({ error: "incorrect password" });
      }
      //if the password is correct, generate a token and return it
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          name: user.name,
        },
        config.JWT_SECRET
      );
      response.json({
        message: "user signed in",
        token,
        username: user.username,
        user: user.name,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
};

module.exports = userController;
