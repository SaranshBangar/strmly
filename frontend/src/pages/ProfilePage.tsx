import { Layout } from "../components/layout/Layout";
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";

export function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <Card className="border-0 shadow-sm">
          <CardHeader className="px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-medium text-gray-900">{user.name}</CardTitle>
                  <CardDescription className="text-gray-500 text-sm">{user.email}</CardDescription>
                </div>
              </div>
              <Button variant="default" size="sm" onClick={() => (window.location.href = "/upload")}>
                Upload Video
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
    </Layout>
  );
}
