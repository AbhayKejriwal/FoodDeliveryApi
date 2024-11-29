// Verify JWT from headers
// Decode token, validate, and attach user data to the request object
import { verifyToken } from "../utils/jwt.js";
import User from "../models/userModel.js";

export const authenticate = async (req, res, next) => {
    const token = req.cookies.auth;
    
    if(!token){
        return res.status(401).json({error: "No token, Unauthorized"});
    }

    try {
        const decoded = verifyToken(token);
        req.user = { id: decoded.userId, role: decoded.role };
        const user = await User.findByID(req.user.id)
        if(!user){
            return res.status(404).json({ message: "user not found" })
        }
        req.userDetails = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Token is not valid" });
    }
};