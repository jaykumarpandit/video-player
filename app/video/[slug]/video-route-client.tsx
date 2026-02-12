"use client";

import { useEffect } from "react";
import { usePlayer } from "@/context/player-context";
import { getCategories } from "@/lib/dataset";

export function VideoRouteClient({ slug }: { slug: string }) {
  const { loadVideo, currentVideo } = usePlayer();

  useEffect(() => {
    // Prevent infinite loop if video is already loaded
    if (currentVideo?.slug === slug) return;

    const categories = getCategories();
    for (const cat of categories) {
      const found = cat.contents.find((v) => v.slug === slug);
      if (found) {
        // Load video without autoplay to avoid mobile NotAllowedError.
        loadVideo(found, cat.contents);
        return;
      }
    }
  }, [slug, loadVideo, currentVideo?.slug]);

  return null;
}


