const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Mentee = require('../models/menteeSchema');
const Mentor = require('../models/mentorSchema');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check for token in the Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Get token from "Bearer <token>"
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Try finding user in Mentee first, then Mentor
            let user = await Mentee.findById(decoded.id).select('-password') 
                        || await Mentor.findById(decoded.id).select('-password');

            if (!user) {
                res.status(401);
                throw new Error('User not found');
            }

            req.user = user; // Attach user to request
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };
