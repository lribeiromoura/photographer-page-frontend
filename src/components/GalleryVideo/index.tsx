import React from 'react';
import ReactPlayer from 'react-player';
import { Media } from '@/@types/media';
import { capitalizeFirstLetter } from '@/util/capitalize';

export interface GalleryVideoProps {
  videos: Media[];
}

export const GalleryVideo = ({ videos }: GalleryVideoProps) => {
  return (
    <>
      {videos.map((video, index) => (
        <div key={index} className="player-container">
          <div className="video-title">
            <h1 className="text-center text-2xl font-bold text-gray-800">
              {video.name}
            </h1>
          </div>
          <div className="player-wrapper">
            <ReactPlayer
              url={video.srcVideo}
              className="react-player"
              width="100%"
              height="100%"
              controls={false}
            />
          </div>
        </div>
      ))}
    </>
  );
};
