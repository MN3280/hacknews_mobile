import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    // Apollo Server Location
    // uri: "https://hacknews.martiniblue.dev/",
    uri: "http://localhost:4000/",
    // Auto caching from Apollo
    cache: new InMemoryCache(),
});

// export it
export default client;
