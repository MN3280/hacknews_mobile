const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

// Import package
const {
    typeDefs: userTypeDefs,
    resolvers: userResolvers,
} = require("./schemas/user");

const {
    typeDefs: postTypeDefs,
    resolvers: postResolvers,
} = require("./schemas/news");

const {
    typeDefs: categoryTypeDefs,
    resolvers: categoryResolvers,
} = require("./schemas/category");

(async () => {
    const server = new ApolloServer({
        typeDefs: [userTypeDefs, postTypeDefs, categoryTypeDefs],

        resolvers: [userResolvers, postResolvers, categoryResolvers],

        introspection: true,
    });

    // Start Server
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
})();
