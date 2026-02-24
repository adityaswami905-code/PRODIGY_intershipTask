const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {

    try {

        const token = req.header("Authorization")?.replace("Bearer"," ");

        if(!token){
            return res.status(404).json({
                success:false,
                message:"Token not found..."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
        
    } catch (error) {
        
        return res.status(500).json({
            success:false,
            message:"Invalid token..."
        });
    }
}