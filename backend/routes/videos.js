const express = require("express");
const Video = require("../models/Video");
const authMiddleware = require("../middleware/auth");
const { uploadLimiter } = require("../middleware/rateLimiter");
const { videoValidation, handleValidationErrors } = require("../middleware/validation");
const { upload, uploadToCloudinary } = require("../utils/upload");

const router = express.Router();

router.post("/upload", authMiddleware, uploadLimiter, upload.single("video"), videoValidation, handleValidationErrors, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Video file is required",
      });
    }

    if (req.file.size > 100 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "File size too large. Maximum size is 100MB",
      });
    }

    const uploadResult = await uploadToCloudinary(req.file, "strmly-videos");
    const video = new Video({
      title,
      description,
      videoUrl: uploadResult.url,
      fileName: uploadResult.filename,
      publicId: uploadResult.publicId,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
      duration: uploadResult.duration,
      fileSize: uploadResult.size,
      uploader: req.user._id,
      uploaderName: req.user.name,
    });

    await video.save();

    await video.populate("uploader", "name email");

    res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      data: {
        video: {
          id: video._id,
          title: video.title,
          description: video.description,
          videoUrl: video.videoUrl,
          fileSize: video.fileSize,
          uploader: {
            id: video.uploader._id,
            name: video.uploader.name,
          },
          createdAt: video.createdAt,
        },
      },
    });
  } catch (error) {
    console.error("Video upload error:", error);

    if (error.message === "Failed to upload file to storage") {
      console.error("Firebase upload error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to upload video file. Please try again.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error during video upload",
    });
  }
});

router.get("/videos", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (page < 1 || limit < 1 || limit > 50) {
      return res.status(400).json({
        success: false,
        message: "Invalid pagination parameters",
      });
    }

    const videos = await Video.find()
      .populate("uploader", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("title description videoUrl uploader uploaderName createdAt fileSize");

    const total = await Video.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const formattedVideos = videos.map((video) => ({
      id: video._id,
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      fileSize: video.fileSize,
      uploader: {
        id: video.uploader._id,
        name: video.uploaderName,
      },
      uploadDate: video.createdAt,
    }));

    res.json({
      success: true,
      message: "Videos retrieved successfully",
      data: {
        videos: formattedVideos,
        pagination: {
          currentPage: page,
          totalPages,
          totalVideos: total,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Get videos error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching videos",
    });
  }
});

router.get("/videos/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("uploader", "name email");

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.json({
      success: true,
      message: "Video retrieved successfully",
      data: {
        video: {
          id: video._id,
          title: video.title,
          description: video.description,
          videoUrl: video.videoUrl,
          fileSize: video.fileSize,
          uploader: {
            id: video.uploader._id,
            name: video.uploader.name,
          },
          uploadDate: video.createdAt,
        },
      },
    });
  } catch (error) {
    console.error("Get video error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid video ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while fetching video",
    });
  }
});

router.get("/recommended", async (req, res) => {
  try {
    const recommendedVideos = await Video.aggregate([
      { $sample: { size: 5 } },
      {
        $lookup: {
          from: "users",
          localField: "uploader",
          foreignField: "_id",
          as: "uploaderInfo",
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          videoUrl: 1,
          fileSize: 1,
          uploaderName: 1,
          createdAt: 1,
          uploader: { $arrayElemAt: ["$uploaderInfo._id", 0] },
          uploaderNameFromDB: { $arrayElemAt: ["$uploaderInfo.name", 0] },
        },
      },
    ]);

    const formattedVideos = recommendedVideos.map((video) => ({
      id: video._id,
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      fileSize: video.fileSize,
      uploader: {
        id: video.uploader,
        name: video.uploaderName || video.uploaderNameFromDB,
      },
      uploadDate: video.createdAt,
    }));

    res.json({
      success: true,
      message: "Recommended videos retrieved successfully",
      data: {
        videos: formattedVideos,
        count: formattedVideos.length,
      },
    });
  } catch (error) {
    console.error("Get recommended videos error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching recommended videos",
    });
  }
});

module.exports = router;
