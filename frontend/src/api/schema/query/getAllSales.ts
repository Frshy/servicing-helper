import { gql } from "@apollo/client";

export const GET_ALL_SALES_QUERY = gql`
    query getAllSales {
        getAllSales {
            id
            service
            price
            orderedBy
            user {
                id
                username
                email
                admin
                updatedAt
                createdAt
            }
            editedAt
            createdAt
            document {
                id
                emailId
                email {
                    sentFrom
                    sentTo
                    trackingImageUrl
                    updatedAt
                    updatedAt
                    EmailEvent {
                        type
                        createdAt
                    }
                }
                documentUrl
                updatedAt
                createdAt
            }
        }
    }
`