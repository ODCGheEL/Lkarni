const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("auth user",req.user);
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Invalid token' });
    }
};
