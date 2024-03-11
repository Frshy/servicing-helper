import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from '@apollo/client';
import { getAccessToken } from './auth';

const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GATEWAY_URL
});

const authMiddleware = new ApolloLink((operation, forward) => {
    const accessToken = getAccessToken();

    if (accessToken) {
        operation.setContext({
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
    }

    return forward(operation);
});

const link = concat(authMiddleware, httpLink);

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
});

export default client;