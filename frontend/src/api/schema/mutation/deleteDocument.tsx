import { gql } from "@apollo/client";

export const DELETE_DOCUMENT_MUTATION = gql`
    mutation DeleteDocument($id: Float!) {
        deleteDocument(id: $id) {
            id
        }
    }
`