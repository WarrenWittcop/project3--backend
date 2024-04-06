const { default: mongoose } = require("mongoose");

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Duration: {
        type: String,
        required: true
    },
})

const nutritionSchema = new mongoose.Schema({
    food: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    totalCalories: {
        type: Number,
        required: true
    },
    calorieCalc: {
        type: Number,
        required: true
    }
})

const userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  age: {
      type: Number
  },
  weight: {
      type: Number
  },
  sex: {
      type: String,
      enum: ["Male", "Female"]
  },
  imageLink: {
      type: String 
  },

    excerise: [exerciseSchema],
    nutrition: [nutritionSchema]
});

const User = mongoose.model("User", userSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);
const Nutrition = mongoose.model("Nutrition", nutritionSchema);

module.exports = {User, Exercise, Nutrition}