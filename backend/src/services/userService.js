const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const registerUser = async (userData)=>{
    const existingUser = await User.findOne({email: userData.email});
    if(existingUser){
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(userData.password,10);

    const newUser = new User({
        email:userData.email,
        password:hashedPassword
    });
    const savedUser =  await newUser.save();
    const mailOptions = {
        from: 'socialNetwork@gmail.com',
        to: userData.email,
        Subject: 'Welcome to social Network',
        text: 'User is Registered. Thank You! 😊'
    };
    try{
       await transporter.sendMail(mailOptions);
    }catch (error){
        console.log("Email error :", error);
    }
   return savedUser;
};

const loginUser = async (email, password) =>{
    const user = await User.findOne({email});
    if(!user) {
        throw new Error('Invalid email or password');
    }
    const currentTime = Date.now();
    if(user.lockUntil && user.lockUntil > currentTime){
        const remainingMinutes = Math.ceil((user.lockUntil - currentTime)/(1000*60));
        throw new Error(`Account locked. Tryagain After 1hr(or in ${remainingMinutes} mins)`);
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        user.loginAttempts += 1;
        if(user.loginAttempts >= 3){
            user.loginUntil = Date.now() + 3600000;
            await user.save();
            throw new Error('Too many failed attempts. Try after 1hr');
        }
        await user.save();
        throw new Error('Invalid email or password');
    }
    
    user.loginAttempts = 0;
    user.lockUntil = 0;
    await user.save();

    const token = jwt.sign(
        { id:   user._id},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    );
    return {user, token};
}
module.exports = {registerUser,loginUser};

