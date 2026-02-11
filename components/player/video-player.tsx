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

export function VideoPlayer({ className, showControls = true }: VideoPlayerProps) {
  const { currentVideo, isPlaying, togglePlay } = usePlayer();
  const playerRef = useRef<ReactPlayer>(null);
  
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    setHasWindow(true);
  }, []);

  if (!currentVideo || !hasWindow) return null;

  const handleProgress = (state: { played: number }) => {
    if (!isSeeking) {
      setPlayed(state.played);
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
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
      <ReactPlayer
        ref={playerRef}
        url={currentVideo.mediaUrl}
        width="100%"
        height="100%"
        playing={isPlaying}
        controls={false}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onPlay={!isPlaying ? togglePlay : undefined}
        onPause={isPlaying ? togglePlay : undefined}
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

