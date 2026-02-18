const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const connectDB = require('./config/db');
const userRoutes = require('./routers/userRoutes');
const profileRoutes = require('./routers/profileRoutes');

connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/users', profileRoutes);


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})



