import { cartProduct } from './../../types';
import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../lib/db';
import { secret } from '../../lib/secret';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return getTransaction();
        case 'POST':
            return createTransaction();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    async function getTransaction() {
        const username = req.query.username as string | undefined;
        if (username) {
            // check if the username is same as the one in token
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: "Unauthorized" });
            jwt.verify(token, secret, async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                const jwtUserName = (decoded as JwtPayload).username;
                if (username !== jwtUserName) return res.status(401).json({ message: "Unauthorized" });
            })
        } else {
            // check if the user is admin
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: "Unauthorized" });
            jwt.verify(token, secret, async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                const { username } = decoded as JwtPayload;
                const user = await db.User.select(["role"]).filter({ username }).getFirst();
                if (!user || user.role?.id !== "admin") return res.status(401).json({ message: "Unauthorized" });
            })
        }
        const transactions = username ?
            await db.Transactions.filter({ user: { username } }).records :
            await db.Transactions.select(["user.id", "user.username","user.role", "*"]).getAll();
        return res.status(200).json(transactions);
    }
    async function createTransaction() {
        const { username, cart }: { username: string, cart: cartProduct[] } = req.body;

        // check price of each product in cart
        for (const item of cart) {
            const product = await db.Products.filter({ id: item.product.id }).getFirst();
            if (!product) return res.status(400).json({ message: "Bad Request" });
            const priceCheck = product.price === item.product.price;
            const studentPriceCheck = priceCheck && product.student_price === item.product.student_price;
            const check = item.product.student_price ? studentPriceCheck : priceCheck;
            if (!check) return res.status(400).json({ message: "Nice try" });
        }

        // read token from auth header
        const token = req.headers.authorization?.split(' ')[1];
        if (!username || !token || !cart) return res.status(400).json({ message: "Bad Request" });
        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const jwtUserName = (decoded as JwtPayload).username;
            if (username !== jwtUserName) return res.status(401).json({ message: "Unauthorized" })
        });

        let user = await db.User.filter({ username }).getFirst();
        if (!user) return res.status(401).json({ message: "User not Exists" });
        await db.Transactions.create({ user, cart_json: JSON.stringify(cart), transaction_timestamp: new Date() });
        return res.status(200).json({ message: "Transaction Created" });
    };
}
