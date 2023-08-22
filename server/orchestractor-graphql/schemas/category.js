if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis(process.env.PORT_REDIS, process.env.REDIS)

const BASE_URL = process.env.BASE_URL
const typeDefs = `#graphql
  type Category {
    id:ID!
    name:String       
  }

  type Query {
    categories: [Category]
  }
`;

const resolvers = {
    Query: {
        categories: async () => {
            try {
                let catList = await redis.get("catList");
                if (catList) {
                    let response = JSON.parse(catList);
                    return response;
                }
                const { data } = await axios({
                    method: "GET",
                    url: `${BASE_URL}/categories`
                })
                redis.set("catList", JSON.stringify(data.result));
                return data.result
            } catch (err) {
                console.log(err);
            }
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}