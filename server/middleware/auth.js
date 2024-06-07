import jwt from 'jsonwebtoken';

//Authentication
export const verifyToken = async (req, res, next) => {
    try {
        //From frontend we are grabing the Authorization header, where the frontend is setting and we grab that to backend. 
        let token = req.header("Authorization");

        if (!token) return res.status(403).send("Access Denied");

        if (token.startswith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();  
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}