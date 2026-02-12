import { HomeFeed } from "@/components/home/home-feed";
import { VideoRouteClient } from "./video-route-client";

export default async function VideoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <VideoRouteClient slug={slug} />
      <HomeFeed />
    </>
  );
}


