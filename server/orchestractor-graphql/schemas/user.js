if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const axios = require('axios');
const BASE_URL_USER = process.env.BASE_URL_USER

const typeDefs = `#graphql

  type User {
    username:String
    email:String       
    phoneNumber:String         
    address:String
  }

type inputUser{
    statusCode: Int
    username:String
    email: String
    }

type deleteUser{
    msg:String
}

  type Query {
    users: [User]
    userDetail(id:String!):User
  }

  type Mutation{
  register(username:String!,email:String!,password:String!,phoneNumber:String!,address:String!):inputUser

  delete(id:String!):deleteUser
  }
`;

const resolvers = {
    Query: {
        //get user
        users: async () => {
            try {
                const { data } = await axios({
                    method: "GET",
                    url: `${BASE_URL_USER}/users`
                })

                return data.user
            } catch (err) {
                console.log(err);
            }
        },
        //get user by id
        userDetail: async (_, { id }) => {
            try {
                const { data } = await axios({
                    method: "GET",
                    url: `${BASE_URL_USER}/users/${id}`
                })
                return data.data
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        //post user
        register: async (_, { username, email, password, phoneNumber, address }) => {
            try {
                const { data } = await axios({
                    method: "POST",
                    url: `${BASE_URL_USER}/users/register`,
                    data: {
                        username: username,
                        email: email,
                        password: password,
                        phoneNumber: phoneNumber,
                        address: address
                    }
                })

                return data
            } catch (err) {
                console.log(err);
            }
        },

        delete: async (_, { id }) => {
            try {
                const { data } = await axios({
                    method: "DELETE",
                    url: `${BASE_URL_USER}/users/${id}`
                })

                return data
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