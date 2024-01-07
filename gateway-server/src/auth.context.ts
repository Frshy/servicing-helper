import { UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

export const AuthContext = async ({ req }) => {
    if (!req.headers?.authorization) {
        throw new UnauthorizedException('No auth token specified!');
    }

    try {
        //idk if i shall use axios here, but @apollo/client requires react package so I think it is not recommended (assuming this auth approach is fine)
        const response = await axios.post(
            'http://localhost:3000/graphql',
            {
                query: `
                 query {
                     getMe {
                        id,
                        username
                        admin
                        updatedAt
                        createdAt
                    }
                }
                 `,
            },
            {
                headers: {
                    Authorization: req.headers.authorization,
                },
            }
        );

        const { data } = response.data;

        const user = data.getMe;

        return {
            user,
            authorization: req.headers.authorization,
        };
    } catch (error) {
        throw new UnauthorizedException('Invalid auth token!');
    }
};
