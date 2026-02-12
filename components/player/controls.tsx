"use client";

import { Play, Pause, RotateCcw, RotateCw, Maximize, Minimize } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ControlsProps {
  playing: boolean;
  played: number;
  duration: number;
  onPlayPause: () => void;
  onSeek: (value: number) => void;
  onSeekEnd: (value: number) => void;
  onSkipForward: () => void;
  onSkipBack: () => void;
}

export function Controls({
  playing,
  played,
  duration,
  onPlayPause,
  onSeek,
  onSeekEnd,
  onSkipForward,
  onSkipBack,
}: ControlsProps) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-black/40 via-transparent to-black/60 p-4 opacity-100 md:opacity-0 md:hover:opacity-100 md:group-hover:opacity-100 transition-opacity">
      <div className="flex justify-end">
        {/* Top controls if needed */}
      </div>

      <div className="flex flex-col gap-4">
        {/* Main Playback Controls */}
        <div className="flex items-center justify-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={onSkipBack}
          >
            <RotateCcw className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-16 w-16 rounded-full bg-white/20 hover:bg-white/30"
            onClick={onPlayPause}
          >
            {playing ? (
              <Pause className="h-8 w-8 fill-white text-white" />
            ) : (
              <Play className="h-8 w-8 fill-white text-white ml-1" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={onSkipForward}
          >
            <RotateCw className="h-8 w-8" />
          </Button>
        </div>

        {/* Progress Bar and Time */}
        <div className="flex flex-col gap-2">
          <Slider
            value={[played * 100]}
            max={100}
            step={0.1}
            onValueChange={(val) => onSeek(val[0])}
            onValueCommit={(val) => onSeekEnd(val[0])}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs font-medium text-white">
            <span>{formatTime(played * duration)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

