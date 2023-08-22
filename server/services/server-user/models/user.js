const { getDatabase } = require("../config/mongoConnection.js")
const { hashPassword } = require("../helpers/bcrypt")

class User {

    static collection() {
        const db = getDatabase();
        const users = db.collection("User");
        return users;
    }

    static findAll() {
        return this.collection().find().toArray()
    }

    static create(data) {
        return this.collection().insertOne({
            username: data.username,
            email: data.email,
            password: hashPassword(data.password),
            phoneNumber: data.phoneNumber,
            address: data.address
        })
    }

    static findOne(params) {
        return this.collection().findOne(params, {
            projection: {
                password: 0
            }
        })
    }

    static delete(params) {
        return this.collection().deleteOne(params)
    }
}

module.exports = User