import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
    mutation signUp($username: String!, $email: String!, $password: String!) {
        signUp(input: { username: $username, email: $email, password: $password }) {
            access_token
        }
    }
`