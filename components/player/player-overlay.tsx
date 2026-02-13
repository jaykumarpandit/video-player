"use client";

import { useEffect, useState } from "react";
import { motion, PanInfo, useAnimation, type Variants } from "framer-motion";
import { ChevronDown, X, Play, Pause } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { usePlayer } from "@/context/player-context";
import { VideoPlayer } from "./video-player";
import { RelatedVideos } from "./related-videos";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PlayerOverlay() {
  const { currentVideo, isMinimized, minimizePlayer, restorePlayer, closePlayer, isPlaying, togglePlay } = usePlayer();
  const router = useRouter();
  const pathname = usePathname();
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);

  // Sync animation with state
  useEffect(() => {
    if (isMinimized) {
      controls.start("minimized");
    } else {
      controls.start("full");
    }
  }, [isMinimized, controls]);

  useEffect(() => {
    if (!pathname?.startsWith("/video/") && currentVideo) {
      closePlayer();
    }
  }, [pathname, currentVideo, closePlayer]);

  if (!currentVideo) return null;

  const handleClose = () => {
    closePlayer();
    if (pathname?.startsWith("/video/")) {
      router.push("/");
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    if (info.offset.y > 100) {
      minimizePlayer();
    } else {
      controls.start("full");
    }
  };

  const variants: Variants = {
    full: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
      borderRadius: 0,
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 } as const,
    },
    minimized: {
      top: "auto",
      left: "auto",
      right: 16,
      bottom: 16,
      width: 320,
      height: 180, // 16:9 aspect ratio roughly
      borderRadius: 12,
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 } as const,
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="full"
      animate={controls}
      drag={!isMinimized ? "y" : false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      className={cn(
        "fixed z-50 overflow-hidden bg-background shadow-2xl",
        isMinimized ? "cursor-pointer" : "flex flex-col"
      )}
      onClick={isMinimized && !isDragging ? restorePlayer : undefined}
    >
      {/* Header / Drag Handle (only visible in full mode) */}
      {!isMinimized && (
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent p-4 text-white">
          <Button variant="ghost" size="icon" className="text-white" onClick={minimizePlayer}>
            <ChevronDown className="h-6 w-6" />
          </Button>
          <span className="text-sm font-medium">Now Playing</span>
          <div className="w-10" /> {/* Spacer */}
        </div>
      )}

      {/* Video Container */}
      <div className={cn("relative w-full bg-black", isMinimized ? "h-full" : "aspect-video shrink-0")}>
        <VideoPlayer/>
        
        {/* Mini Player Controls Overlay */}
        {isMinimized && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Button variant="ghost" size="icon" className="text-white" onClick={(e) => { e.stopPropagation(); togglePlay(); }}>
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
            </Button>
            <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6 text-white" onClick={(e) => { e.stopPropagation(); handleClose(); }}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Content Below Video (only in full mode) */}
      {!isMinimized && (
        <div className="flex-1 overflow-y-auto bg-background">
          <div className="p-4">
            <h1 className="text-xl font-bold">{currentVideo.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Swipe down on the video to minimize
            </p>
          </div>
          <RelatedVideos />
        </div>
      )}
    </motion.div>
  );
}

