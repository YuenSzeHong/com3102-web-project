import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import db from "../../../lib/db";
import { secret } from "../../../lib/secret";

type loginRequest = {
    username: string;
    password: string;
    keepLogin: boolean;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }

    const { username, password, keepLogin } = req.body as loginRequest;

    if (!username || !password) {
        return res.status(400).json({ message: "username/password missing" });
    }

    const user = await db.User.select(["id", "username", "password", "role.id"]).filter({ username }).getFirst();

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
        await db.loginStats.create({
            user: user.id,
            login_date: new Date(),
            login_ip: req.socket.remoteAddress?.toString() || "unknown",
            remarks: "Invalid password",
            success: false,
        });


        return res.status(401).json({ message: "Invalid password" });
    }

    if (!user.role) {
        await db.loginStats.create({
            user: user.id,
            login_date: new Date(),
            login_ip: req.socket.remoteAddress?.toString() || "unknown",
            remarks: "User has no role",
            success: false,
        });

        return res.status(500).json({ message: "User has no role" });
    }

    const role = user.role.id as string;

    const token = keepLogin ? sign({ username, role }, secret, { expiresIn: "7d" }) : sign({ username, role }, secret);

    const cookieOptions = keepLogin ? { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true } : { httpOnly: true };

    res.setHeader("Set-Cookie", [`token=${token}`, JSON.stringify(cookieOptions)]);
    await db.loginStats.create({
        user: user.id,
        login_date: new Date(),
        login_ip: req.socket.remoteAddress?.toString() || "unknown",
        success: true,
    });

    const Payload = {
        username: user.username,
        token: token,
        role: user.role.id,
    }

    res.status(200).json(Payload);
}
