if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis(process.env.PORT_REDIS, process.env.REDIS)
const BASE_URL = process.env.BASE_URL || "http://localhost:4002";
const BASE_URL_USER = process.env.BASE_URL_USER || "http://localhost:4001";

class AppController {
    static async readArticle(req, res, next) {
        try {
            let post = await redis.get("post:get");

            if (post) {
                let result = JSON.parse(post)
                return res.status(200).json({
                    statusCode: 200,
                    result
                })
            }

            const { data } = await axios({
                method: "GET",
                url: `${BASE_URL}/posts`
            })

            const { data: user } = await axios({
                method: "GET",
                url: `${BASE_URL_USER}/users/${data.result[0].authorId}`
            })

            data.User = user
            redis.set("post:get", JSON.stringify(data))
            res.status(200).json({
                statusCode: 200,
                data
            })
        } catch (err) {
            console.log(err);

        }
    }

    static async RenderPostDetail(req, res, next) {
        try {
            const { id } = req.params
            const { data } = await axios({
                method: 'GET',
                url: `${BASE_URL}/posts/${id}`
            })
            res.status(200).json({
                statusCode: 200,
                data
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                statusCode: 500
            })
        }
    }

    static async createPost(req, res, next) {
        try {
            const { title, content, imgUrl, categoryId, name, name1, name2 } = req.body
            const { data } = await axios({
                method: 'POST',
                url: `${BASE_URL}/posts/createPost`,
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    title, content, imgUrl, categoryId, name, name1, name2
                }
            })

            const keys = await redis.keys("post:*");
            await redis.del(keys);

            res.status(201).json({
                statusCode: 201,
                data
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                statusCode: 500,
            })
        }
    }

    static async deletePostById(req, res, next) {
        try {
            const { id } = req.params

            const { data } = await axios({
                method: 'DELETE',
                url: `${BASE_URL}/${id}`
            })
            const keys = await redis.keys("post:*");
            await redis.del(keys);
            res.status(200).json({
                statusCode: 200,
                data
            })
        } catch (err) {
            console.log(err);
        }
    }

    static async editPost(req, res, next) {
        try {
            const { id } = req.params
            const { title, content, imgUrl, categoryId, name, name1, name2 } = req.body
            const { data } = await axios({
                method: 'PUT',
                url: `${BASE_URL}/posts/${id}`,
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    title, content, imgUrl, categoryId, name, name1, name2
                }
            })
            const keys = await redis.keys("post:*");
            await redis.del(keys);
            res.status(201).json({
                statusCode: 201,
                data
            })
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = AppController