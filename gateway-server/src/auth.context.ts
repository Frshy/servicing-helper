import { UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

export const AuthContext = async ({ req }) => {
    try {

        //idk if i shall use axios here, but @apollo/client requires react package so I think it is not recommended (assuming this auth approach is fine)
        if (req.headers?.authorization && req?.body?.operationName != 'signUp' && req?.body?.operationName != 'signIn') {

            const response = await axios.post(
                process.env.AUTH_URL,
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
                        Authorization: req?.headers?.authorization,
                        'x-api-key': process.env.AUTH_API_KEY
                    },
                }
            );

            const { data } = response.data;

            const user = data.getMe;

            return {
                user,
                authorization: req.headers.authorization,
            };
        }
    } catch (error) {
        throw new UnauthorizedException('Invalid auth token!');
    }
};
