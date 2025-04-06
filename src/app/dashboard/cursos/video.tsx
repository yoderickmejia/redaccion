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
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isMuted}
        className="w-full h-full object-cover"  // Asegura que el video ocupe todo el contenedor y se adapte
        onTimeUpdate={handleTimeUpdate} // Evento que actualiza el progreso
      >
        <source src={videoURL} type="video/mp4" />
      </video>

      {/* Controles personalizados */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity">
        <div className="flex justify-between">
          <button onClick={togglePlayPause} className="text-white">
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={toggleMute} className="text-white">
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
        </div>

        <div className="mt-2">
          <div className="w-full mb-2">
            {/* Barra de progreso */}
            <progress value={videoProgress} max={100} className="w-full h-1" />
          </div>

          <div className="flex justify-between items-center text-white text-sm">
            <span>{videoProgress.toFixed(0)}%</span>
            <span>{Math.floor((videoProgress / 100) * (videoRef.current?.duration || 0))} / {Math.floor(videoRef.current?.duration || 0)} sec</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
