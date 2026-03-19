const cloudinary = require("../config/cloudinary");

//  Upload file
const uploadFile = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    res.json({ url: result.secure_url });
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadFile };