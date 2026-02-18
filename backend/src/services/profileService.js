const User = require('../models/user');


class ProfileService {
  async getMyProfile(userId){
    return await User.findById(userId).select('-password');
  }

  async getPublicProfile(username){
    return await User.findOne({username}).select('username profile createdAt');
  }


}
module.exports = new ProfileService();











