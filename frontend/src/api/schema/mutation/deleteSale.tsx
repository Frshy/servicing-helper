import { gql } from "@apollo/client";

export const DELETE_SALE_MUTATION = gql`
    mutation DeleteSale($id: Float!) {
        deleteSale(id: $id) {
            id
        }
    }
`