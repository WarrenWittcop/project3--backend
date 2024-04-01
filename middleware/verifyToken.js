const jwt = require ("jsonwebtoken")
const { JWT_SECRET } = process.env

const createToken = (user) => {
    try {
        const token = jwt.sign({id: user._id, email: user.email, 
            username: user.username}, JWT_SECRET, {expiresIn: "24h"})
            return token
    } catch (err) {
        console.log(err)
    }
}

const verifyToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"]
        console.log(bearerHeader, "bearerHeader")

        if(!bearerHeader) {
            return res.status(403).json({message: "You don't have permission to use this."})
        }

        const bearer = bearerHeader.split(" ")[1]

        const decoded = jwt.verify(bearerHeader, JWT_SECRET)

        if(!decoded){
            return res.status(400)
        }

        next()
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Internal server error."})
    }
}

module.exports = {
    createToken,
    verifyToken
}