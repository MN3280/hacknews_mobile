if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || "rahasia"


function signToken(payload) { //payload (obj)
    return jwt.sign(payload, secret)
}

const verifyToken = token => {
    return jwt.verify(token, secret)
}

module.exports = { signToken, verifyToken }



