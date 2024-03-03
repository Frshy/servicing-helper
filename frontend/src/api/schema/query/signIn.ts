import { gql } from "@apollo/client";

export const SIGN_IN_QUERY = gql`
    query signIn($email: String!, $password: String!) {
        signIn(input: { email: $email, password: $password }) {
            access_token
        }
    }
`