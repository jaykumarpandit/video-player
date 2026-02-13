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
    <section className="flex flex-col gap-4 py-4">
      <div className="px-4 md:px-6">
        <h3 className="text-lg font-semibold">Related Videos</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:px-6">
        {filteredVideos.map((video) => (
          <VideoCard
            key={video.slug}
            video={video}
            relatedVideos={filteredVideos}
          />
        ))}
      </div>
    </section>
  );
}

