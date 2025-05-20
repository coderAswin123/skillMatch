const asyncHandler = require('express-async-handler');
const Mentee = require('../models/menteeSchema');
const Mentor = require('../models/mentorSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:"20d"});
}


const registerUser = asyncHandler(async(req,res)=>{

        const { name, email, password, role, skill, availability, experienceLevel } = req.body;
    
        if (!name || !email || !password || !role) {
            res.status(400);
            throw new Error("Fill all the required fields");
        }
    
        // Check for duplicate email in both schemas BEFORE role condition
        const existingMentee = await Mentee.findOne({ email });
        const existingMentor = await Mentor.findOne({ email });
    
        if (existingMentee || existingMentor) {
            res.status(400);
            throw new Error("Email already exists");
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Register mentee
        if (role.toLowerCase() === 'mentee') {
            const mentee = await Mentee.create({
                name,
                email,
                password: hashedPassword,
                role
            });
    
            res.status(201).json({
                _id: mentee.id,
                name: mentee.name,
                email: mentee.email,
                token: generateToken(mentee.id)
            });
    
        }
        //  Register mentor
        else if (role.toLowerCase() === 'mentor') {
            const mentor = await Mentor.create({
                name,
                email,
                password: hashedPassword,
                role,
                skill,
                availability,
                experienceLevel
            });
    
            res.status(201).json({
                _id: mentor.id,
                name: mentor.name,
                email: mentor.email,
                token: generateToken(mentor.id)
            });
    
        } 

        else {
            res.status(400);
            throw new Error("Invalid role");
        }
});     

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide both Email and Password');
    }

    // Check for user in both schemas
    let user = await Mentee.findOne({ email }) || await Mentor.findOne({ email }) ;
 
    //  If user is found, compare password
    if (user && await bcrypt.compare(password, user.password)) {
        // Return successful login response with token
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});



const getLoggedInUser =asyncHandler(async(req,res) => {
    const userId = req.user.id;

    let user = await Mentee.findById(userId);

    if(!user){
        user = await Mentor.findById(userId);
    }
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        skill: user.skill,
    });
    // console.log("Fetching logged in user data...");
    // res.send("collect info of logged in user")
});

const updateLoggedInUser =asyncHandler(async(req,res) => {
    res.send("updated  the info of loggedInUser")
});

const getMentorBySkill = asyncHandler(async(req ,res)=>{
    res.send("User found his Mentor by skill.")
})

module.exports = {
    registerUser,
    loginUser,
    getLoggedInUser,
    updateLoggedInUser,
    getMentorBySkill,
}