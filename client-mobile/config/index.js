import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    // uri: "https://hacknews.martiniblue.dev/",
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
});

// export it
export default client;
