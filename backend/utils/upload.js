const multer = require("multer");
const { cloudinary } = require("../config/cloudinary");
const { Readable } = require("stream");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

const uploadToCloudinary = async (file, folder = "videos") => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: folder,
          public_id: `${Date.now()}_${Math.random().toString(36).substring(2)}`,
          overwrite: true,
          quality: "auto",
          format: "mp4",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(new Error("Failed to upload file to storage"));
          } else {
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
              filename: result.public_id,
              size: result.bytes,
              originalName: file.originalname,
              format: result.format,
              width: result.width,
              height: result.height,
              duration: result.duration,
            });
          }
        }
      );

      const bufferStream = new Readable();
      bufferStream.push(file.buffer);
      bufferStream.push(null);
      bufferStream.pipe(uploadStream);
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload file to storage");
  }
};

module.exports = {
  upload,
  uploadToCloudinary,
};
