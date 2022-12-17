import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { secret } from "../../lib/secret";
import db from "../../lib/db";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            return getLoginStat();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getLoginStat() {

        if (!req.cookies.token) {
            return res.status(400).json({ message: "no token" });
        }

        jwt.verify(req.cookies.token as string, secret, async (err, decoded) => {
            if (err || !decoded) {
                return res.status(400).json({ message: "Invalid token" });
            }

            const { username } = decoded as JwtPayload;
            const user = await db.User.filter({ username: username }).getFirst();

            if (!user) {
                return res.status(401).json({ message: "Invalid token" });
            }

            if (!user.role) {
                return res.status(403).json({ message: "Invalid token" });
            }

            if (user.role.id !== "admin") {
                return res.status(403).json({ message: "You are not authorized to access this" });
            }

            const records = await db.loginStats.select(["login_date", "login_ip", "remarks", "success", "user.username"]).getAll();

            return res.status(200).json(records);
        });
    }


}