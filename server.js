const express = require('express');
const connectDB = require('./config/db')
require('dotenv').config(); // Add this line if missing

const port = 3000;

connectDB();

const app = express();

app.use(express.json());

console.log("Setting up routes");

app.use('/api/users', require('./backend/routes/userRoutes'));

app.listen(port,()=> {
    console.log(`Server is listening on port ${port}`);
}); 

