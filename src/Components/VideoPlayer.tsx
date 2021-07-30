import React, { useEffect, useRef, useState } from "react";
import { Video } from "expo-av";

interface Props {
  video: string;
}

const VideoPlayer = ({ video }: Props) => {
  const videoRef = useRef<Video>(null);

  return (
    <Video
      ref={videoRef}
      source={{ uri: video }}
      useNativeControls
      resizeMode="contain"
      style={{ width: "100%" }}
    />
  );
};
export default VideoPlayer;
