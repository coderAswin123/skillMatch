const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
{
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },

    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },

    role: { // if he is mentor, he can access all mentees but not the other way around
        type: String,
        required: [true, 'Please add a role'],
    },
 
    skill: {
        type: String,
        required: [true, 'Please add your required Skills'],
    },

    availability: {
        type: String,
    },

    experienceLevel:{
        type: Number,
    }
       
},  
{    
    timestamps: true,
});


module.exports = mongoose.model('User',userSchema);

