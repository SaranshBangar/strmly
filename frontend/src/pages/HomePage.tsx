import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { Upload, Play } from "lucide-react";

export function HomePage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-red-600">Strmly</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your videos with the world. Upload, discover, and connect with a global community of creators.
          </p>
        </div>

        {isAuthenticated ? (
          <div className="text-center mb-16">
            <h2 className="text-2xl font-semibold mb-4">Welcome back, {user?.name}!</h2>
            <div className="flex justify-center space-x-4">
              <Link to="/feed">
                <Button size="lg">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Videos
                </Button>
              </Link>
              <Link to="/upload">
                <Button size="lg" variant="outline">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Video
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center mb-16">
            <div className="flex justify-center space-x-4">
              <Link to="/signup">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}

        {!isAuthenticated && (
          <div className="text-center bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-gray-600 mb-6">Join thousands of creators sharing their stories on Strmly</p>
            <Link to="/signup">
              <Button size="lg">Create Your Account</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
