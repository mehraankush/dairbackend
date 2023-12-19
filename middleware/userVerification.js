import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken'

export const attachUserMiddleware = async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.cookies.token, process.env.SALT_SECRET);
        const user = await User.findById(decodedToken.userId);

        if (user) {
            req.user = user;
        }
    } catch (err) {
        console.error('Error attaching user information:', err);
    }
    next();
};