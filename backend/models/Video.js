const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    videoUrl: {
      type: String,
      required: [true, "Video URL is required"],
    },
    fileName: {
      type: String,
      required: [true, "File name is required"],
    },
    publicId: {
      type: String,
      required: [true, "Public ID is required"],
    },
    format: {
      type: String,
      default: "mp4",
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    duration: {
      type: Number,
    },
    fileSize: {
      type: Number,
      required: [true, "File size is required"],
    },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Uploader is required"],
    },
    uploaderName: {
      type: String,
      required: [true, "Uploader name is required"],
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.index({ createdAt: -1 });
videoSchema.index({ uploader: 1 });

module.exports = mongoose.model("Video", videoSchema);
