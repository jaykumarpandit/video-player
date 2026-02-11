"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { Content } from "@/types/dataset";
import { usePlayer } from "@/context/player-context";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: Content;
  categoryName?: string;
  relatedVideos?: Content[];
  className?: string;
  aspectRatio?: "video" | "square" | "auto";
}

export function VideoCard({ 
  video, 
  categoryName, 
  relatedVideos = [], 
  className,
  aspectRatio = "video"
}: VideoCardProps) {
  const { playVideo } = usePlayer();

  return (
    <div 
      className={cn("group cursor-pointer flex flex-col gap-2", className)}
      onClick={() => playVideo(video, relatedVideos)}
    >
      <div className={cn(
        "relative overflow-hidden rounded-xl bg-muted",
        aspectRatio === "video" && "aspect-video",
        aspectRatio === "square" && "aspect-square",
      )}>
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
            <Play className="h-6 w-6 fill-white text-white" />
          </div>
        </div>
        {/* Duration placeholder since not in dataset */}
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
          4:20
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-foreground">
          {video.title}
        </h3>
        {categoryName && (
          <span className="inline-flex w-fit rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
            {categoryName}
          </span>
        )}
      </div>
    </div>
  );
}

