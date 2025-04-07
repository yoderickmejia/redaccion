import React, { useState, useRef } from 'react';

type VideoPlayerProps = {
  videoURL: string;  // URL del video a mostrar
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoURL }) => {
  const videoRef = useRef<HTMLVideoElement>(null); // Referencia al video
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Estado de reproducción
  const [isMuted, setIsMuted] = useState<boolean>(false);  // Estado de silencio
  const [videoProgress, setVideoProgress] = useState<number>(0); // Progreso del video

  // Función para alternar entre reproducir y pausar
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Función para alternar entre mute y unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Actualizar el progreso del video
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setVideoProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-6">
      {/* Elemento video con ajustes de adaptación */}
      {/* <iframe
        className="w-full h-full"
        src={videoURL}


        title="YouTube video player" 
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"  
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe> */}

      {/* Removed duplicate iframe */}
      
      <iframe
        className="w-full h-full absolute inset-0 object-cover"
        src={videoURL}
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin"  
        allowFullScreen
      ></iframe>

      {/* Controles personalizados */}
    

        
  </div>
  );
};

export default VideoPlayer;
