# STRMLY Backend API

A mini backend application for video sharing with user authentication, video upload to Cloudinary, and public video feed.

## Features

- ✅ User registration and authentication with JWT
- ✅ Secure password hashing with bcrypt
- ✅ Video upload to Cloudinary with automatic optimization
- ✅ Video metadata storage in MongoDB
- ✅ Public video feed with pagination
- ✅ Rate limiting for API protection
- ✅ Input validation and sanitization
- ✅ Security headers with Helmet
- ✅ CORS configuration
- ✅ Error handling and logging

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **File Storage**: Cloudinary (Video hosting and optimization)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Security**: Helmet, express-rate-limit
- **Validation**: express-validator
- **File Upload**: Multer

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-here

# Cloudinary Configuration
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd strmly/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   - Copy `.env.example` to `.env`
   - Fill in your Firebase and MongoDB credentials

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Start the production server**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

#### Register User

- **POST** `/signup` or `/api/auth/signup`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2024-01-01T00:00:00.000Z"
      },
      "token": "jwt_token"
    }
  }
  ```

#### Login User

- **POST** `/login` or `/api/auth/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "Password123"
  }
  ```
- **Response**: Same as register

#### Get User Profile

- **GET** `/profile` or `/api/auth/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Profile retrieved successfully",
    "data": {
      "user": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  }
  ```

### Video Management

#### Upload Video

- **POST** `/upload` or `/api/upload`
- **Headers**: `Authorization: Bearer <token>`
- **Content-Type**: `multipart/form-data`
- **Body**:
  - `video`: Video file (MP4, max 100MB)
  - `title`: Video title (2-100 characters)
  - `description`: Video description (10-500 characters)
- **Response**:
  ```json
  {
    "success": true,
    "message": "Video uploaded successfully",
    "data": {
      "video": {
        "id": "video_id",
        "title": "My Video",
        "description": "Video description",
        "videoUrl": "https://firebase-url",
        "fileSize": 1024000,
        "uploader": {
          "id": "user_id",
          "name": "John Doe"
        },
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    }
  }
  ```

#### Get All Videos (Public Feed)

- **GET** `/videos` or `/api/videos`
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10, max: 50)
- **Response**:
  ```json
  {
    "success": true,
    "message": "Videos retrieved successfully",
    "data": {
      "videos": [
        {
          "id": "video_id",
          "title": "Video Title",
          "description": "Video description",
          "videoUrl": "https://firebase-url",
          "fileSize": 1024000,
          "uploader": {
            "id": "user_id",
            "name": "John Doe"
          },
          "uploadDate": "2024-01-01T00:00:00.000Z"
        }
      ],
      "pagination": {
        "currentPage": 1,
        "totalPages": 5,
        "totalVideos": 50,
        "hasNextPage": true,
        "hasPrevPage": false
      }
    }
  }
  ```

#### Get Recommended Videos

- **GET** `/recommended` or `/api/recommended`
- **Description**: Returns 5 random videos for recommendation
- **Response**:
  ```json
  {
    "success": true,
    "message": "Recommended videos retrieved successfully",
    "data": {
      "videos": [
        {
          "id": "video_id",
          "title": "Video Title",
          "description": "Video description",
          "videoUrl": "https://firebase-url",
          "fileSize": 1024000,
          "uploader": {
            "id": "user_id",
            "name": "John Doe"
          },
          "uploadDate": "2024-01-01T00:00:00.000Z"
        }
      ],
      "count": 5
    }
  }
  ```

#### Get Single Video

- **GET** `/videos/:id` or `/api/videos/:id`
- **Response**: Single video object

### Utility

#### Health Check

- **GET** `/health`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Server is running",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "environment": "development"
  }
  ```

## Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Authentication**: 10 requests per 15 minutes per IP
- **Video Upload**: 5 requests per hour per IP

## Validation Rules

### User Registration

- **Name**: 2-50 characters, letters and spaces only
- **Email**: Valid email format
- **Password**: Minimum 6 characters, must contain uppercase, lowercase, and number

### Video Upload

- **Title**: 2-100 characters
- **Description**: 10-500 characters
- **File**: MP4 format, maximum 100MB

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

## Security Features

- **Helmet**: Security headers
- **Rate Limiting**: Prevents abuse
- **CORS**: Controlled cross-origin access
- **JWT**: Secure authentication
- **bcrypt**: Password hashing
- **Input Validation**: Prevents injection attacks
- **File Type Validation**: Only video files allowed
- **File Size Limits**: Prevents large file uploads

## Development

### Project Structure

```
backend/
├── config/
│   ├── database.js      # MongoDB connection
│   └── firebase.js      # Firebase configuration
├── middleware/
│   ├── auth.js          # JWT authentication
│   ├── errorHandler.js  # Global error handling
│   ├── rateLimiter.js   # Rate limiting configuration
│   └── validation.js    # Input validation rules
├── models/
│   ├── User.js          # User schema
│   └── Video.js         # Video schema
├── routes/
│   ├── auth.js          # Authentication routes
│   └── videos.js        # Video routes
├── utils/
│   └── upload.js        # File upload utilities
├── .env                 # Environment variables
├── .gitignore          # Git ignore rules
├── index.js            # Main application file
├── package.json        # Dependencies and scripts
└── README.md           # Documentation
```

### Available Scripts

- `npm start`: Start production server
- `npm run dev`: Start development server with nodemon

## License

ISC License
