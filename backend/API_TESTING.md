# API Testing Examples

Here are some example requests you can use to test the API endpoints:

## 1. Health Check

```bash
curl http://localhost:3000/health
```

## 2. User Registration

```bash
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123"
  }'
```

## 3. User Login

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

## 4. Get User Profile (requires token)

```bash
curl -X GET http://localhost:3000/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## 5. Upload Video (requires token)

```bash
curl -X POST http://localhost:3000/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -F "video=@path/to/your/video.mp4" \
  -F "title=My Awesome Video" \
  -F "description=This is a description of my awesome video that is at least 10 characters long"
```

## 6. Get All Videos (public)

```bash
curl http://localhost:3000/videos
```

## 7. Get All Videos with Pagination

```bash
curl "http://localhost:3000/videos?page=1&limit=5"
```

## 8. Get Recommended Videos (5 random videos)

```bash
curl http://localhost:3000/recommended
```

## 9. Get Single Video by ID

```bash
curl http://localhost:3000/videos/VIDEO_ID_HERE
```

### Pagination Parameters for /videos endpoint:

- `page` (optional): Page number (default: 1, minimum: 1)
- `limit` (optional): Number of videos per page (default: 10, minimum: 1, maximum: 50)

### Example Pagination Responses:

```bash
# Get first page with 10 videos (default)
curl http://localhost:3000/videos

# Get second page with 5 videos per page
curl "http://localhost:3000/videos?page=2&limit=5"

# Get third page with default limit
curl "http://localhost:3000/videos?page=3"
```

## Testing with Postman

1. **Set up Environment Variables:**

   - Create a new environment in Postman
   - Add variable `baseUrl` with value `http://localhost:3000`
   - Add variable `token` (will be set after login)

2. **Test Flow:**
   1. POST `{{baseUrl}}/signup` - Register a new user
   2. POST `{{baseUrl}}/login` - Login and copy the token
   3. Set the `token` environment variable
   4. GET `{{baseUrl}}/profile` with header `Authorization: Bearer {{token}}`
   5. POST `{{baseUrl}}/upload` with form-data (video file + title + description)
   6. GET `{{baseUrl}}/videos` - View all videos (with pagination)
   7. GET `{{baseUrl}}/recommended` - Get 5 random recommended videos

## Sample Video File

For testing, you can use any MP4 video file under 100MB. If you don't have one, you can:

1. Record a short video with your phone
2. Download a sample video from sample-videos.com
3. Create a short test video using any video editing software

## Expected Responses

### Success Response Format:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  }
}
```

### Error Response Format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Specific error message"
    }
  ]
}
```

## Rate Limiting

Be aware of the rate limits:

- General API: 100 requests per 15 minutes
- Auth endpoints: 10 requests per 15 minutes
- Upload endpoint: 5 requests per hour

If you hit the rate limit, wait for the time window to reset.
