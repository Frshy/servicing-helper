import { gql } from "@apollo/client";

export const CREATE_DOCUMENT_MUTATION = gql`
    mutation CreateDocument($saleId: Float!) {
        createDocument(saleId: $saleId) {
            id
            documentUrl
            updatedAt
            createdAt
        }
    }
`