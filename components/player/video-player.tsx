"use client";

import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { usePlayer } from "@/context/player-context";
import { Controls } from "./controls";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  className?: string;
  showControls?: boolean;
}

const ReactPlayerAny = ReactPlayer as any;

export function VideoPlayer({ className, showControls = true }: VideoPlayerProps) {
  const { currentVideo, isPlaying, togglePlay, setPlaying } = usePlayer();
  const playerRef = useRef<any>(null);
  
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    setHasWindow(true);
  }, []);

  if (!currentVideo || !hasWindow) return null;

  // Normalize URL for different media types
  let url = currentVideo.mediaUrl;
  if (currentVideo.mediaType === "YOUTUBE") {
    // Always prefer watch URL format for ReactPlayer to ensure it uses the correct player
    // Handle embed URLs: https://youtube.com/embed/ID -> https://www.youtube.com/watch?v=ID
    if (url && url.includes("/embed/")) {
        const id = url.split("/embed/")[1]?.split("?")[0];
        if (id) {
            url = `https://www.youtube.com/watch?v=${id}`;
        }
    } else if (!url || (!url.includes("youtube.com") && !url.includes("youtu.be"))) {
      // Fallback to constructing from slug if no URL or invalid
      const id = currentVideo.slug.split("?")[0];
      url = `https://www.youtube.com/watch?v=${id}`;
    }
  }

  const handleProgress = (state: any) => {
    if (!isSeeking && typeof state?.played === "number") {
      setPlayed(state.played);
    }
  };

  const syncDuration = () => {
    const d = playerRef.current?.getDuration();
    if (typeof d === "number" && !Number.isNaN(d) && d > 0) {
      setDuration(d);
    }
  };

  const handleSeek = (value: number) => {
    setIsSeeking(true);
    setPlayed(value / 100);
  };

  const handleSeekEnd = (value: number) => {
    setIsSeeking(false);
    playerRef.current?.seekTo(value / 100);
  };

  const handleSkip = (seconds: number) => {
    const currentTime = playerRef.current?.getCurrentTime() || 0;
    playerRef.current?.seekTo(currentTime + seconds);
  };

  return (
    <div className={cn("relative aspect-video w-full bg-black group", className)}>
      <ReactPlayerAny
        ref={playerRef}
        src={url}
        width="100%"
        height="100%"
        playing={isPlaying}
        controls={false}
        onProgress={handleProgress}
        onReady={syncDuration}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        config={{
          youtube: {
            playerVars: { showinfo: 0, controls: 0, modestbranding: 1 }
          }
        }}
      />
      
      {showControls && (
        <Controls
          playing={isPlaying}
          played={played}
          duration={duration}
          onPlayPause={togglePlay}
          onSeek={handleSeek}
          onSeekEnd={handleSeekEnd}
          onSkipForward={() => handleSkip(10)}
          onSkipBack={() => handleSkip(-10)}
        />
      )}
    </div>
  );
}

