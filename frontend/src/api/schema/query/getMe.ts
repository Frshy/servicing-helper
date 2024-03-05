import { gql } from "@apollo/client";

export const GET_ME_QUERY = gql`
    query GetMe {
        getMe {
            id
            username
            admin
            sales {
                id
                price
                service
                document {
                    documentUrl
                }
                createdAt
            }
            updatedAt
            createdAt
        }
    }
`