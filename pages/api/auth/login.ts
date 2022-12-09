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
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { username, password, keepLogin } = req.body as loginRequest;

    if (!username || !password) {
        return res.status(400).json({ message: "username/password missing" });
    }

    const user = await db.User.select(["id", "username", "password"]).filter({ username }).getFirst();

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

    await db.loginStats.create({
        user: user.id,
        login_date: new Date(),
        login_ip: req.socket.remoteAddress?.toString() || "unknown",
        success: true,
    });
    const token = keepLogin ? sign({ username }, secret, { expiresIn: "7d" }) : sign({ username }, secret);
    const cookieOptions = keepLogin ? { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true } : { httpOnly: true };
    res.setHeader("Set-Cookie", [`token=${token}`, JSON.stringify(cookieOptions)]);

    res.status(200).json({ token });
}
