const User = require("../models/user")
const { ObjectId } = require("mongodb")
const { hashPassword } = require("../helpers/bcrypt")
class UserController {

    static async readUser(req, res, next) {
        try {
            const user = await User.findAll();

            user.forEach(e => {
                delete (e.password);
            });
            res.status(200).json({
                statusCode: 200,
                user,
            })
        } catch (err) {
            console.log(err);
        }
    }

    static async register(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body


            const created = await User.create({ username, email, password: hashPassword(password), phoneNumber, address })

            res.status(201).json({
                id: created.insertedId,
                statusCode: 201,
                username: username,
                email: email,
                phoneNumber: phoneNumber,
                address: address
            })
        } catch (err) {
            console.log(err);
        }
    }

    static async getOne(req, res, next) {
        try {
            const { id } = req.params

            const params = {
                _id: new ObjectId(id),
            }

            const result = await User.findOne(params)

            res.status(200).json({
                statusCode: 200,
                data: result
            })
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params
            const params = {
                _id: new ObjectId(id),
            }

            const result = await User.delete(params)

            res.status(200).json({
                statusCode: 200,
                msg: `User deleted successfully`
            })
        } catch (err) {
            console.log(err);
        }
    }

}


module.exports = UserController