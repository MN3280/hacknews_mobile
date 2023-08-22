if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis(process.env.PORT_REDIS, process.env.REDIS)
const BASE_URL_USER = process.env.BASE_URL_USER || "http://localhost:4001";

class UserController {
    static async readUser(req, res, next) {
        try {
            let user = await redis.get("user:get");

            if (user) {
                let result = JSON.parse(user)
                return res.status(200).json({
                    statusCode: 200,
                    result
                })
            }
            const { data } = await axios({
                method: "GET",
                url: `${BASE_URL_USER}/users`
            })
            redis.set("user:get", JSON.stringify(data))
            res.status(200).json({
                statusCode: 200,
                data
            })
        } catch (err) {
            console.log(err);
        }
    }

    static async register(req, res, next) {
        try {
            const { username, email, phoneNumber, password, address } = req.body

            const { data } = await axios({
                method: 'POST',
                url: `${BASE_URL_USER}/users/register`,
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    username: username,
                    email: email,
                    phoneNumber: phoneNumber,
                    password: password,
                    address: address
                }
            })
            const keys = await redis.keys("user:*");
            await redis.del(keys);
            res.status(201).json({
                statusCode: 201,
                username: data.username,
                email: data.email,
            })
        } catch (err) {
            console.log(err);
        }
    }

    static async getOne(req, res, next) {
        try {
            const { id } = req.params
            const { data } = await axios({
                method: 'GET',
                url: `${BASE_URL_USER}/users/${id}`
            })
            res.status(200).json({
                statusCode: 200,
                data
            })
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params
            const { data } = await axios({
                method: 'DELETE',
                url: `${BASE_URL_USER}/users/${id}`
            })
            res.status(200).json({
                statusCode: 200,
                data
            })
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = UserController