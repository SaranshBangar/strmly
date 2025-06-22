# Cloudinary Storage Setup

## Configuration

This project uses Cloudinary for video file uploads and management. Cloudinary provides video optimization, transformation, and delivery capabilities.

**Cloud Name:** `duevc1osk`

## Environment Variables

The following environment variables are configured in your `.env` file:

```env
CLOUDINARY_URL=cloudinary://916152228595545:7fksqcfdfvZG5LOmfGs9MLIdeGY@duevc1osk
CLOUDINARY_CLOUD_NAME=duevc1osk
CLOUDINARY_API_KEY=916152228595545
CLOUDINARY_API_SECRET=7fksqcfdfvZG5LOmfGs9MLIdeGY
```

## Cloudinary Features

### Video Optimization

- Automatic format conversion to optimal formats (MP4, WebM)
- Quality optimization based on viewing device
- Adaptive bitrate streaming support
- Video compression without quality loss

### File Organization

Videos are organized in folders:

```
Cloudinary Media Library/
└── strmly-videos/
    ├── {timestamp}_{random_string}
    ├── {timestamp}_{random_string}
    └── ... (other video files)
```

### Video Metadata

Each uploaded video includes:

- Secure URL for streaming
- Public ID for identification
- Dimensions (width x height)
- Duration in seconds
- File size in bytes
- Format information

## File Upload Configuration

- **Maximum file size:** 100MB
- **Supported formats:** All video formats (video/\*)
- **Storage location:** `strmly-videos/` folder in Cloudinary
- **File naming:** `{timestamp}_{random_string}`
- **Output format:** Optimized MP4
- **Quality:** Auto (adaptive based on content)

## Video Transformations

Cloudinary automatically applies optimizations:

- Format conversion to MP4
- Quality optimization
- Responsive delivery
- Fast CDN delivery worldwide

## Usage

The `uploadToCloudinary` function in `utils/upload.js` handles all Cloudinary operations:

1. Accepts multipart file upload via multer
2. Generates unique public ID with timestamp and random string
3. Uploads video to Cloudinary in the `strmly-videos/` folder
4. Returns secure URL and comprehensive metadata
5. Applies automatic optimizations

## Testing

You can test the Cloudinary configuration using the test files:

```bash
# Test Cloudinary connection
node test-cloudinary.js

# Test video upload functionality
node test-upload.js
```

## Setup Steps

1. **Install Dependencies**: Run `npm install` to install Cloudinary package
2. **Test Connection**: Run `node test-cloudinary.js` to verify connection
3. **Test Upload**: Run `node test-upload.js` to verify upload functionality
4. **Start Server**: Run `npm run dev` to start the development server

## API Endpoints

- `POST /api/videos/upload` - Upload a video file to Cloudinary
- `GET /api/videos/videos` - Get paginated list of videos
- `GET /api/videos/videos/:id` - Get specific video details
- `GET /api/videos/recommended` - Get recommended videos

## Video Delivery

Videos are delivered via Cloudinary's global CDN:

- Fast worldwide delivery
- Automatic format optimization
- Adaptive quality streaming
- Mobile-optimized delivery

## Security

- Secure upload URLs
- API key authentication
- Upload presets for controlled access
- Automatic malware scanning

## Error Handling

The system includes comprehensive error handling for:

- File size limits (100MB max)
- Invalid file formats
- Cloudinary upload failures
- Authentication errors
- Network connectivity issues

## Benefits Over Firebase Storage

- **Video Optimization**: Automatic format conversion and quality optimization
- **CDN Delivery**: Global content delivery network for fast streaming
- **Transformations**: Real-time video transformations and effects
- **Analytics**: Detailed upload and delivery analytics
- **Scalability**: Enterprise-grade scalability and reliability
