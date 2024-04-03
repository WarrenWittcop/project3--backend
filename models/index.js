const mongoose = require("mongoose")
const { MONGODB_URI } = process.env



mongoose.connect(MONGODB_URI)

mongoose.connection
    .on("connected", () => {
        console.log("MongoDB connected")
    })
    .on("close", () => {
        console.log("Disconnected from MongoDB")
    })
    .on("error", (error) => {
        console.log("Error connecting to MongoDB", error)
    })

module.exports = {
    User: require("./User")
}