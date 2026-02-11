"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Content } from "@/types/dataset";

interface PlayerContextType {
  currentVideo: Content | null;
  isPlaying: boolean;
  isMinimized: boolean;
  relatedVideos: Content[];
  playVideo: (video: Content, related?: Content[]) => void;
  togglePlay: () => void;
  minimizePlayer: () => void;
  restorePlayer: () => void;
  closePlayer: () => void;
  setRelatedVideos: (videos: Content[]) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentVideo, setCurrentVideo] = useState<Content | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [relatedVideos, setRelatedVideos] = useState<Content[]>([]);

  const playVideo = (video: Content, related: Content[] = []) => {
    setCurrentVideo(video);
    setRelatedVideos(related);
    setIsPlaying(true);
    setIsMinimized(false);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const minimizePlayer = () => {
    setIsMinimized(true);
  };

  const restorePlayer = () => {
    setIsMinimized(false);
  };

  const closePlayer = () => {
    setCurrentVideo(null);
    setIsPlaying(false);
    setIsMinimized(false);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentVideo,
        isPlaying,
        isMinimized,
        relatedVideos,
        playVideo,
        togglePlay,
        minimizePlayer,
        restorePlayer,
        closePlayer,
        setRelatedVideos,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}

