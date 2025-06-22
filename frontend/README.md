# [STRMLY Frontend](https://strmly-saransh-bangar.vercel.app/)

A modern React.js video sharing platform built with TypeScript, Tailwind CSS, and shadcn/ui components.

## 🚀 Features

### Authentication

- **Login/Signup Pages** - Secure user authentication with form validation
- **JWT Token Management** - Automatic token storage and authentication headers
- **Protected Routes** - Route protection for authenticated users only
- **User Profile** - View and manage user information

### Video Management

- **Video Upload** - Upload videos with title, description, and file validation
- **Video Feed** - Browse all videos with pagination
- **Recommended Videos** - Personalized video recommendations
- **Video Player** - Built-in HTML5 video player with controls

### User Interface

- **Responsive Design** - Mobile-first responsive layout
- **Modern UI Components** - Built with shadcn/ui and Tailwind CSS
- **Loading States** - Smooth loading animations and skeleton screens
- **Error Handling** - User-friendly error messages and retry options

## 🛠️ Tech Stack

- **Frontend Framework**: React.js 19+ with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: React Context API (AuthContext)
- **HTTP Client**: Fetch API with custom hooks
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Layout components
│   └── ProtectedRoute.tsx
├── pages/
│   ├── HomePage.tsx     # Landing page
│   ├── LoginPage.tsx    # User login
│   ├── SignupPage.tsx   # User registration
│   ├── FeedPage.tsx     # Video feed with pagination
│   ├── UploadPage.tsx   # Video upload form
│   └── ProfilePage.tsx  # User profile and videos
├── hooks/
│   └── useAuth.tsx      # Authentication context and hook
├── api/                 # API layer (separate from src)
│   ├── auth.ts          # Authentication API functions
│   ├── video.ts         # Video API functions
│   └── index.ts         # API exports
└── App.tsx              # Main app with routing
```

## 🎯 Pages Overview

### 1. Home Page (`/`)

- **Purpose**: Landing page with app introduction
- **Features**: Hero section, feature highlights, call-to-action
- **Access**: Public (shows different content for authenticated users)

### 2. Login Page (`/login`)

- **Purpose**: User authentication
- **Features**: Email/password form, password visibility toggle, error handling
- **Redirect**: Redirects to feed page on successful login

### 3. Signup Page (`/signup`)

- **Purpose**: User registration
- **Features**: Name, email, password, confirm password, validation
- **Redirect**: Redirects to feed page on successful registration

### 4. Feed Page (`/feed`)

- **Purpose**: Browse and discover videos
- **Features**:
  - Recommended videos section
  - All videos with pagination
  - Video cards with player, title, description
  - Upload date, file size, uploader info
- **Access**: Protected (requires authentication)

### 5. Upload Page (`/upload`)

- **Purpose**: Upload new videos
- **Features**:
  - Title and description inputs
  - File upload with drag-and-drop
  - File validation (size, type)
  - Upload progress indicator
  - Preview selected file info
- **Access**: Protected (requires authentication)

### 6. Profile Page (`/profile`)

- **Purpose**: User profile and video management
- **Features**:
  - User information display
  - Upload statistics (video count, total size, last upload)
  - User's uploaded videos grid
  - Quick upload button
- **Access**: Protected (requires authentication)

## 🚀 Getting Started

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Environment Setup**:
   Create `.env` file:

   ```
   VITE_BACKEND_URL=http://localhost:3000
   ```

3. **Start Development Server**:

   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## 🔧 API Integration

The frontend connects to the backend through a custom API layer:

- **Auth API**: Login, signup, profile, logout
- **Video API**: Upload, list, get by ID, recommended
- **Error Handling**: Consistent error messages and retry logic
- **Token Management**: Automatic token inclusion in requests
