# STRMLY - Video Sharing Platform

A full-stack video sharing platform built for STRMLY internship assignment, featuring user authentication, video uploads, and a modern responsive interface.

## 🌐 Live Demo

- **Frontend**: [strmly-saransh-bangar.vercel.app](https://strmly-saransh-bangar.vercel.app/)
- **Backend API**: [strmly.onrender.com](https://strmly.onrender.com)

## 👨‍💻 Developer

[Saransh Bangar](https://drive.google.com/drive/folders/1GcwiK2DfFOEbB14ACD0m_vEjhQ5SqysZ?usp=sharing)

## 🚀 Features

### Authentication & Security

- User registration and login with JWT authentication
- Secure password hashing with bcrypt
- Protected routes and middleware
- Rate limiting and input validation

### Video Management

- Video upload to Cloudinary with automatic optimization
- Video metadata storage in MongoDB
- Public video feed with pagination
- HTML5 video player with controls

### Modern UI/UX

- Responsive design with Tailwind CSS
- Modern components using shadcn/ui
- Form validation with React Hook Form and Zod
- Intuitive navigation and user experience

## 🛠️ Tech Stack

### Frontend

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for modern UI components
- **React Router DOM** for navigation
- **React Hook Form** + **Zod** for form validation

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Cloudinary** for video storage and optimization
- **JWT** for authentication
- **bcrypt** for password hashing
- **Helmet** for security headers

## 📁 Project Structure

```
strmly/
├── frontend/          # React TypeScript frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── api/           # API integration
│   └── public/            # Static assets
├── backend/           # Node.js Express backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API route handlers
│   ├── middleware/        # Custom middleware
│   ├── config/            # Configuration files
│   └── utils/             # Utility functions
└── package.json       # Root package configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- Cloudinary account

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd strmly
```

2. **Install dependencies**

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

3. **Environment Setup**

Create `.env` files in both frontend and backend directories with required variables (see respective README files for details).

4. **Run the application**

```bash
# From root directory - runs both frontend and backend concurrently
npm run dev

# Or run individually:
npm run frontend  # Frontend only
npm run backend   # Backend only
```

The application will be available at:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## 📝 Available Scripts

- `npm run dev` - Run both frontend and backend concurrently
- `npm run frontend` - Run frontend development server
- `npm run backend` - Run backend development server

## 🔧 Configuration

Each component (frontend/backend) has its own detailed configuration guide:

- [`frontend/README.md`](./frontend/README.md) - Frontend setup and configuration
- [`backend/README.md`](./backend/README.md) - Backend setup and API documentation

## 🤝 Contributing

This project was developed as part of the STRMLY internship assignment. For questions or feedback, please contact the developer.

## 📄 License

ISC License - see individual package.json files for details.

---

**Built with by [Saransh Bangar](https://www.saransh-bangar.xyz/)**
