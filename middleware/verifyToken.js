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

    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    createToken,
    verifyToken
}