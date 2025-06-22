import { useState, useEffect } from "react";
import { Layout } from "../components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { videoAPI, type Video } from "../../api";
import { Calendar, FileVideo, ChevronLeft, ChevronRight } from "lucide-react";

export function FeedPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [recommendedVideos, setRecommendedVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVideos, setTotalVideos] = useState(0);

  const loadVideos = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await videoAPI.getVideos({ page, limit: 6 });
      setVideos(response.data.videos);
      setCurrentPage(response.data.pagination.currentPage);
      setTotalPages(response.data.pagination.totalPages);
      setTotalVideos(response.data.pagination.totalVideos);
    } catch (error: any) {
      setError(error.message || "Failed to load videos");
    } finally {
      setIsLoading(false);
    }
  };

  const loadRecommendedVideos = async () => {
    try {
      const response = await videoAPI.getRecommendedVideos();
      setRecommendedVideos(response.data.videos);
    } catch (error: any) {
      console.error("Failed to load recommended videos:", error);
    }
  };

  useEffect(() => {
    loadVideos();
    loadRecommendedVideos();
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      loadVideos(page);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const VideoCard = ({ video }: { video: Video }) => (
    <Card className="group overflow-hidden transition-all duration-300 border-0 shadow-md bg-white">
      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
        <video src={video.videoUrl} controls className="w-full h-full object-cover transition-transform duration-300" preload="metadata">
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
      </div>
      <CardHeader className="pb-3 px-6 pt-4">
        <CardTitle className="text-lg font-semibold line-clamp-2 text-gray-900 group-hover:text-red-600 transition-colors">{video.title}</CardTitle>
        {video.description && <CardDescription className="line-clamp-2 text-gray-600 text-sm leading-relaxed">{video.description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-0 px-6 pb-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <span className="font-medium">{video.uploader.name}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(video.uploadDate)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
            <FileVideo className="w-3 h-3" />
            <span className="text-xs font-medium">{formatFileSize(video.fileSize)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading && videos.length === 0) {
    return (
      <Layout>
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Video Feed</h1>
            <p className="text-gray-600">Loading videos...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="aspect-video bg-gray-200" />
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Video Feed</h1>
          {totalVideos > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Showing {videos.length} of {totalVideos} videos
            </p>
          )}
        </div>

        {recommendedVideos.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {recommendedVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}

        {error ? (
          <div className="text-center py-12">
            <div className="text-red-600 bg-red-50 p-4 rounded-md max-w-md mx-auto">{error}</div>
            <Button onClick={() => loadVideos(currentPage)} className="mt-4" variant="outline">
              Try Again
            </Button>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <FileVideo className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No videos found</h3>
            <p className="text-gray-600 mb-4">Be the first to share a video with the community!</p>
            <Button onClick={() => (window.location.href = "/upload")}>Upload Video</Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">All Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex items-center space-x-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
