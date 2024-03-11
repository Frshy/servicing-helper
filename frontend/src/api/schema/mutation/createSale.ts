import { gql } from "@apollo/client";

export const CREATE_SALE_MUTATION = gql`
    mutation CreateSale($service: String!, $price: Float!, $orderedBy: Int!) {
        createSale(input: { service: $service, price: $price, orderedBy: $orderedBy }) {
            id
        }
    }
`