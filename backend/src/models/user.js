const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: 
  { 
    type: String, 
    required: true, 
    unique: true,
    trim: true 
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase: true
  },
  password:{
    type: String,
    required:true
  },
  createdAt:{
    type: Date,
    default:Date.now
  },
  loginAttempts: 
  { 
    type: Number, 
    default: 0 
  },
  lockUntil: 
  { 
    type: Number, 
    default: 0 
  },
  profile: {
    displayName: { type: String, default: '' },
    bio:         { type: String, maxLength: 160, default: '' },
    avatar:      { type: String, default: 'https://via.placeholder.com/150' },
    location:    { type: String, default: '' },
    website:     { type: String, default: '' }
  }
},{});
module.exports = mongoose.models.User || mongoose.model('User', userSchema);