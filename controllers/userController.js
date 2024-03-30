const db = require("../models")
const bcrypt = require("bcrypt")
const {createToken} = require("../middleware/verifyToken")

const signup = async (req, res) => {
    try {
        const {username, email, password} = req.body

        const query = db.User.findOne({})

        query.or([{username: username}, {email: email}])

        const foundUser = await query.exec()

        if(foundUser.length !== 0) {
            return res.status(400).json({message: "User already exists."})
        }

        const salt = await bcrypt.genSalt(10)
        const hash =  await bcrypt.hash(password, salt)

        req.body.password = hash

        const createdUser = await db.User.create(req.body)
        await createdUser.save()
        
        return res.status(201).json({message: "User created.", userId: createdUser.id})
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Internal server error."})
    }
}

const login = async (req, res) => {
    try {
        const {username, email, password} = req.body
        const query = db.User.find({})

        query.and([{username: username}, {email: email}])
        const foundUser = await query.exec()

        if(foundUser.length === 0) {
            return res.status(400).json({message: "User not found."})
        }

        const verifyPassword = await bcrypt.compare(password, foundUser[0].password)

        if(!verifyPassword) {
            return res.status(400).json({message: "Incorrect password."})
        }

        const token = createToken(foundUser[0])
        return res.status(200).json({token, id: foundUser[0]._id})

    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Internal server error."})
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id
        const query = db.User.findById(id)

        query.select("-password")
        const foundUser = await query.exec()

        console.log(foundUser)

        if(!foundUser) {
            return res.status(400).json({message: "User not found."})
        }
        return res.status(200).json({message: "User found", data: foundUser})

    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Internal server error."})
    }
}

module.exports = {
    signup,
    login,
    getUser
}

