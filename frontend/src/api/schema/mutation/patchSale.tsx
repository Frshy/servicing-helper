import { gql } from "@apollo/client";

export const PATCH_SALE_MUTATION = gql`
    mutation PatchSale($id: Int!, $service: String, $price: Float, $orderedBy: Int) {
        patchSale(input: { id: $id, service: $service, price: $price, orderedBy: $orderedBy }) {
            id
        }
    }
`