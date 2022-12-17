import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import { secret } from "../../lib/secret";
import jwt, { JwtPayload } from "jsonwebtoken";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            return getProduct();
        case 'POST':
            return createProduct();
        case 'DELETE':
            return deleteProduct();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    async function getProduct() {
        const { search } = req.query;

        const products = await db.Products.search(search as string);

        if (!req.cookies.token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(req.cookies.token, secret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const { username } = decoded as JwtPayload;
            const isStudent = await db.User.select(["student.id"]).filter({ username }).getFirst();

            //if user is student, select student price

            const products_student = products.map(p => {

                return {

                    ...p,

                    student_price: isStudent ? p.student_price : undefined,

                    id: undefined

                }

            })
            return res.status(200).json(products_student);
        });
    }



    async function createProduct() {
        if (!req.cookies.token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(req.cookies.token, secret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const { username } = decoded as JwtPayload;
            const user = await db.User.select(["role"]).filter({ username }).getFirst();
            const { title, description, price, student_price } = req.body;

            if (!user) {
                return res.status(401).json({ message: "User not Exists" });
            }

            if (user.role?.create_products) {
                const createProducts = await db.Products.create({
                    title,
                    description,
                    price,
                    student_price,
                });
                return res.status(200).json(createProducts);
            }

        });

    }
    async function deleteProduct() {
        const { id } = req.body;
        const productDelete = await db.Transactions.delete(id);
        console.log(productDelete);
    }


}