const bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);

function hashPassword(plainPassword) {
    return bcrypt.hashSync(plainPassword, salt)
}
module.exports = { hashPassword }