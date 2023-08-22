if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis(process.env.PORT_REDIS, process.env.REDIS)
const BASE_URL = process.env.BASE_URL
const BASE_URL_USER = process.env.BASE_URL_USER

const typeDefs = `#graphql
  type Category{
    id:ID!
    name:String 
  }

  type User {
    username:String
    email:String       
    phoneNumber:String         
    address:String
  }

  type Tags{
    id:ID!
    name:String 
    name2:String
    name3:String
    postId:Int
  }

  type Post {
    id:ID!
    title:String       
    slug:String         
    content:String
    imgUrl: String
    categoryId:Int
    authorId:String
    authorName:String
    Category:Category
    Tags:[Tags]
  }

  type addPost{
    status:Int,
    statusText:String
  }

  type deletePost{
    msg:String
  }

  type updatePost{
  statusCode:Int,
  msg:String
  }

  type Query {
    posts: [Post]
    postDetail(id:ID!): Post
    postByCategory(id:ID!): [Post]
  }

  type Mutation{
    createPost(title:String!,content:String!, imgUrl: String!,categoryId:Int!,authorId:String!,name:String!,name1:String!,name2:String!):addPost

    postDelete(id:ID!):deletePost

    updatePostById(id:ID!,title:String!,content:String!, imgUrl: String!,categoryId:Int!,authorId:String!):updatePost
  }
`;

const resolvers = {
    Query: {
        posts: async () => {
            try {
                let postList = await redis.get("postList");
                if (postList) {
                    let response = JSON.parse(postList);
                    return response;
                }

                const { data } = await axios({
                    method: "GET",
                    url: `${BASE_URL}/posts`
                })

                const tags = data.result
                const tag = tags.map((el) => {
                    return el.Tags
                })

                redis.set("postList", JSON.stringify(data.result));
                return data.result
            } catch (err) {
                console.log(err);
            }
        },
        postDetail: async (_, { id }) => {
            try {

                const { data } = await axios({
                    method: "GET",
                    url: `${BASE_URL}/posts/${id}`
                })

                const dataUser = await axios({
                    method: "GET",
                    url: `${BASE_URL_USER}/users/${data.response.authorId}`
                })
                data.response.authorName = dataUser.data.data.username

                return data.response
            } catch (err) {
                console.log(err);
            }
        },
        postByCategory: async (_, { id }) => {
            try {
                const { data } = await axios({
                    method: "GET",
                    url: `${BASE_URL}/posts/renderbycat?category=${id}`
                })

                return data.result
            } catch (err) {
                console.log(err);
            }
        }
    },

    Mutation: {
        createPost: async (_, { title, content, imgUrl, categoryId, authorId, name, name1, name2 }) => {
            try {
                const data = {
                    title: title,
                    content: content,
                    imgUrl: imgUrl,
                    categoryId: categoryId,
                    authorId: authorId,
                    name: name,
                    name1: name1,
                    name2: name2
                }
                const response = await axios({
                    method: "POST",
                    url: `${BASE_URL}/posts/createPost`,
                    data: data
                })
                redis.del("postList");

                return response
            } catch (err) {
                console.log(err);
            }
        },

        postDelete: async (_, { id }) => {
            try {
                const { data } = await axios({
                    method: "DELETE",
                    url: `${BASE_URL}/posts/${id}`
                })
                redis.del("postList");
                return data
            } catch (err) {
                console.log(err);
            }
        },

        updatePostById: async (_, { id, title, content, imgUrl, categoryId, authorId }) => {
            try {
                const { data } = await axios({
                    method: "PUT",
                    url: `${BASE_URL}/posts/${id}`,
                    data: {
                        title: title,
                        content: content,
                        imgUrl: imgUrl,
                        categoryId: categoryId,
                        authorId: authorId,

                    }
                })
                redis.del("postList");
                return data;
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