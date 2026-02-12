"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { Content } from "@/types/dataset";

interface PlayerContextType {
  currentVideo: Content | null;
  isPlaying: boolean;
  isMinimized: boolean;
  relatedVideos: Content[];
  playVideo: (video: Content, related?: Content[]) => void;
  loadVideo: (video: Content, related?: Content[]) => void;
  togglePlay: () => void;
  setPlaying: (playing: boolean) => void;
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

  const loadVideo = useCallback((video: Content, related: Content[] = []) => {
    setCurrentVideo(video);
    setRelatedVideos(related);
    setIsMinimized(false);
  }, []);

  const playVideo = useCallback((video: Content, related: Content[] = []) => {
    loadVideo(video, related);
    setIsPlaying(true);
  }, [loadVideo]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const setPlaying = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  const minimizePlayer = useCallback(() => {
    setIsMinimized(true);
  }, []);

  const restorePlayer = useCallback(() => {
    setIsMinimized(false);
  }, []);

  const closePlayer = useCallback(() => {
    setCurrentVideo(null);
    setIsPlaying(false);
    setIsMinimized(false);
  }, []);

  const contextValue = React.useMemo(
    () => ({
      currentVideo,
      isPlaying,
      isMinimized,
      relatedVideos,
      playVideo,
      loadVideo,
      togglePlay,
      setPlaying,
      minimizePlayer,
      restorePlayer,
      closePlayer,
      setRelatedVideos,
    }),
    [
      currentVideo,
      isPlaying,
      isMinimized,
      relatedVideos,
      playVideo,
      loadVideo,
      togglePlay,
      setPlaying,
      minimizePlayer,
      restorePlayer,
      closePlayer,
      setRelatedVideos,
    ]
  );

  return (
    <PlayerContext.Provider value={contextValue}>
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

