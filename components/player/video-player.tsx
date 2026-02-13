"use client";

import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { usePlayer } from "@/context/player-context";
import { cn } from "@/lib/utils";

import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";


interface VideoPlayerProps {
  className?: string;
}

const ReactPlayerAny = ReactPlayer as any;

export function VideoPlayer({ className }: VideoPlayerProps) {
  const { currentVideo, isPlaying, setPlaying, relatedVideos, playVideo } = usePlayer();
  const playerRef = useRef<any>(null);
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    setHasWindow(true);
  }, []);

  if (!currentVideo || !hasWindow) return null;

  // Normalize URL for different media types
  let url = currentVideo.mediaUrl;
  if (currentVideo.mediaType === "YOUTUBE") {
    if (url && url.includes("/embed/")) {
      const id = url.split("/embed/")[1]?.split("?")[0];
      if (id) {
        url = `https://www.youtube.com/watch?v=${id}`;
      }
    } else if (!url || (!url.includes("youtube.com") && !url.includes("youtu.be"))) {
      const id = currentVideo.slug.split("?")[0];
      url = `https://www.youtube.com/watch?v=${id}`;
    }
  }

  const handleEnded = () => {
    if (!currentVideo) return;

    const list = relatedVideos || [];
    if (!list.length) {
      setPlaying(false);
      return;
    }

    const index = list.findIndex((v) => v.slug === currentVideo.slug);
    const next = index >= 0 ? list[index + 1] : null;

    if (next) {
      // Play next video in the same category list
      playVideo(next, list);
    } else {
      // Last video in category – just stop
      setPlaying(false);
    }
  };


  return (
    <div className={cn("relative aspect-video w-full bg-black group", className)}>
      <MediaController
        style={{
          width: "100%",
          aspectRatio: "16/9",
        }}
      >
        <ReactPlayerAny
          slot="media"
          ref={playerRef}
          src={url}
          width="100%"
          height="100%"
          playing={isPlaying}
          controls={false}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={handleEnded}
          style={{
            width: "100%",
            height: "100%",
            "--controls": "none",
          }}
          config={{
            youtube: {
              playerVars: { showinfo: 0, controls: 0, modestbranding: 1 }
            }
          }}
        />
        <MediaControlBar>
          <MediaPlayButton />
          <MediaSeekBackwardButton seekOffset={10} />
          <MediaSeekForwardButton seekOffset={10} />
          <MediaTimeRange />
          <MediaTimeDisplay showDuration />
          <MediaMuteButton />
          <MediaVolumeRange />
          <MediaPlaybackRateButton />
          <MediaFullscreenButton />
        </MediaControlBar>
      </MediaController>
    </div>
  );
}

