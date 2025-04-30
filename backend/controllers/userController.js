const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async(req,res)=>{
    //console.log("user registered!")
    res.send("user registered !")
})

const loginUser = asyncHandler(async(req,res)=>{
    //console.log("user logined!")
    res.send("user logged in")
})


const getLoggedInUser =asyncHandler(async(req,res) => {
    console.log("Fetching logged in user data...");
    res.send("collect info of logged in user")
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