import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { secret } from '../../../lib/secret';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }

    // get token from headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'no token' });
    }
    // verify token
    jwt.verify(token, secret, async (err, decoded) => {
        // if token is expired, return 401 and message
        if (err) {
            return res.status(401).json({ message: err.message });
        }
    });
    // if token is valid, return 200 and message
    return res.status(200).json({ message: 'token is valid' });
}
