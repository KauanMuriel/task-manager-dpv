import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export class AuthMiddleware {
    public validate = async (req: Request, res: Response, next) => {
        try {
            const token = req.headers.authorization.replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.body.userData = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Authentication failed" });
        }
    }
}