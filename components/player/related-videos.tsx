"use client";

import { usePlayer } from "@/context/player-context";
import { VideoCard } from "@/components/video-card";

export function RelatedVideos() {
  const { relatedVideos, currentVideo } = usePlayer();

  // Filter out the current video
  const filteredVideos = relatedVideos.filter(
    (video) => video.slug !== currentVideo?.slug
  );

  if (filteredVideos.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <h3 className="text-lg font-semibold">Related Videos</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredVideos.map((video) => (
          <VideoCard
            key={video.slug}
            video={video}
            relatedVideos={relatedVideos}
            aspectRatio="video"
            className="flex-row gap-4 sm:flex-col"
          />
        ))}
      </div>
    </div>
  );
}

