const db = require("../models/index.js");
const bcrypt = require("bcrypt");
const {User} = require("../models/User")
const { createToken } = require("../middleware/verifyToken");
const { verifyToken } = require("../middleware/verifyToken");

// Function to handle user signup
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email already exists in the database
    const query = User.find({});
    query.or([{ username: username }, { email: email }]);
    const foundUser = await query.exec();

    if (foundUser.length !== 0) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create a new user object with the hashed password
    const newUser = new User({
      username: username,
      email: email,
      password: hash
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(201).json({ message: "User created.", userId: newUser.id });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Internal server error." });
  }
};

// Function to handle user login
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Find the user by username or email
    const foundUser = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!foundUser) {
      return res.status(400).json({ message: "User not found." });
    }

    // Compare the provided password with the hashed password in the database
    const verifyPassword = await bcrypt.compare(password, foundUser.password);

    if (!verifyPassword) {
      return res.status(400).json({ message: "Incorrect password." });
    }



    
    // Create a JWT token for authentication
    const token = createToken(foundUser);
    return res.status(200).json({ token, id: foundUser._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// Function to get user information by ID
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Fetching details for user ID:", id);

    // Find the user by ID and exclude the password field
    const foundUser = await User.findById(id).select("-password");
    // query.select("-password");
    // const foundUser = await query.exec();

    if (!foundUser) {
      return res.status(400).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "User found", data: foundUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const updateUser = async (req, res) => {
  try {
      const id = req.params.id;
      const updatedUserData = req.body;

      // Find the user by ID and update their data
      const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ message: "User not found." });
      }

      return res.status(200).json({ message: "User updated successfully", data: updatedUser });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
  }
};


const addExercise = async (req, res) => {
  const userId = req.params.id;
  const exerciseData = req.body; // Assuming this contains the exercise details like name and duration
  console.log("Adding exercise for user ID:", userId, exerciseData)
  try {
      const user = await User.findByIdAndUpdate(userId, {$push: {exercise: exerciseData}}, { new: true });
      if (!user) {
          return res.status(404).json({ message: "User not found." });
      }

      // user.exercise.push(exerciseData);
      // await user.save();
      res.status(201).json({ message: "Exercise added successfully.", exercise: exerciseData });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error." });
  }
};

const removeExercise = async (req, res) => {
  const userId = req.params.userId;
  const exerciseId = req.params.exerciseId;

  try {
      const user = await User.findByIdAndUpdate(userId, {$pull: {exercise: {_id: exerciseId}}}, { new: true });
      const exercise = user.exercise.id(exerciseId);
      if (!exercise) {
          return res.status(404).json({ message: "Exercise not found." });
      }

      // exercise.remove();
      // await user.save();
      res.status(200).json({ message: "Exercise removed successfully." });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error." });
  }
};

const updateExercise = async (req, res) => {
  const userId = req.params.userId;
  const exerciseId = req.params.exerciseId;
  const exerciseUpdates = req.body;

  try {
      const user = await User.findById(userId);
      const exercise = user.exercise.id(exerciseId);

      if (!exercise) {
          return res.status(404).json({ message: "Exercise not found." });
      }

      exercise.set(exerciseUpdates);
      await user.save();
      res.status(200).json({ message: "Exercise updated successfully.", exercise: exercise });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error." });
  }
};




module.exports = {
  signup,
  login,
  getUser,
  updateUser,
  addExercise,
  removeExercise,
  updateExercise
};