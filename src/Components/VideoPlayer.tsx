import React, { useRef, useState } from "react";
import { Video } from "expo-av";

interface Props {
  video: string;
}

const VideoPlayer = ({ video }: Props) => {
  const videoRef = useRef(null);

  return (
    <Video
      ref={videoRef}
      source={{
        uri: video,
      }}
      useNativeControls
      resizeMode="contain"
      isLooping
    />
  );
};

export default VideoPlayer;
