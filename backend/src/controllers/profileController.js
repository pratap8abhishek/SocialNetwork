const profileService = require('../services/profileService');


exports.getMe = async (req,res) =>{
try {
    const user = await profileService.getMyProfile(req.user.id);
    res.status(200).json(user);
} catch (error) {
   res.status(500).json({ message: "Error fetching own profile", error: error.message }); 
}
};

exports.getPublic = async (req, res) =>{
    try {
        const user = await profileService.getPublicProfile(request.params.username);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

exports.updateMe = async (req, res) => {
  try {
    const updated = await profileService.updateProfile(req.user.id, req.body);
    res.status(200).json({ message: "Profile updated!", data: updated });
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};














