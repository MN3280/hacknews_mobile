const bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);

function hashPassword(plainPassword) {
    return bcrypt.hashSync(plainPassword, salt)
}

function comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword)
}
module.exports = { hashPassword, comparePassword }