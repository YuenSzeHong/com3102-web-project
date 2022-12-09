// return all users and their student info if they have one, only admin can access this route.
import db from "../../lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { secret } from "../../lib/secret";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    if (!req.cookies.token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // get role of logged in user
    // decode jwt token to get username
    jwt.verify(req.cookies.token, secret, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { username } = decoded as JwtPayload;
        const user = await db.User.select(["role"]).filter({ username }).getFirst();

        if (!user) {
            return res.status(401).json({ message: "User not Exists" });
        }

        if (!user.role?.check_user_stats) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    });
    const UserRecords = await db.User.select(["username", "role", "student.*"]).getMany();

    res.status(200).json(UserRecords);
}