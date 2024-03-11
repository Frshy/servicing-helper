import { gql } from "@apollo/client";

export const FIND_ALL_USERS_QUERY = gql`
    query findAllUsers {
        findAllUsers {
            id
            username
            email
            admin
            updatedAt
            createdAt
            sales {
                id
            }
        }
    }
`