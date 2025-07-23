import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Video {
  id: string;
  url: string;
  username: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  music: string;
  avatar: string;
}

const SAMPLE_VIDEOS: Video[] = [
  {
    id: '1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    username: 'creativeuser',
    caption: 'Amazing sunset vibes! 🌅 #sunset #nature #beautiful',
    likes: 12400,
    comments: 324,
    shares: 89,
    music: 'original sound - creativeuser',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '2',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    username: 'adventurer_jane',
    caption: 'Living my best life! ✨ What\'s your weekend plan?',
    likes: 8500,
    comments: 156,
    shares: 43,
    music: 'Feel Good Music - Artist',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '3',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    username: 'tech_guru',
    caption: 'Mind-blowing tech trick! 🤯 Try this at home',
    likes: 15600,
    comments: 789,
    shares: 234,
    music: 'Epic Beat Drop - DJ Mix',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  }
];

const VideoCard = ({ video, isActive }: { video: Video; isActive: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(video.likes);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="relative w-full h-screen bg-video-bg overflow-hidden">
      <video
        ref={videoRef}
        src={video.url}
        className="w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        onClick={toggleMute}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-overlay pointer-events-none" />
      
      {/* Right sidebar actions */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6">
        {/* Profile Avatar */}
        <div className="relative">
          <img
            src={video.avatar}
            alt={video.username}
            className="w-12 h-12 rounded-full border-2 border-text-white"
          />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">+</span>
          </div>
        </div>

        {/* Like button */}
        <div className="flex flex-col items-center space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className={`p-3 rounded-full transition-all duration-200 ${
              isLiked 
                ? 'bg-like-color/20 text-like-color animate-like-bounce' 
                : 'bg-black/30 text-text-white hover:bg-black/50'
            }`}
            onClick={handleLike}
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          <span className="text-text-white text-xs font-semibold">
            {formatCount(likes)}
          </span>
        </div>

        {/* Comment button */}
        <div className="flex flex-col items-center space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="p-3 bg-black/30 text-text-white hover:bg-black/50 rounded-full"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
          <span className="text-text-white text-xs font-semibold">
            {formatCount(video.comments)}
          </span>
        </div>

        {/* Share button */}
        <div className="flex flex-col items-center space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="p-3 bg-black/30 text-text-white hover:bg-black/50 rounded-full"
          >
            <Share className="w-6 h-6" />
          </Button>
          <span className="text-text-white text-xs font-semibold">
            {formatCount(video.shares)}
          </span>
        </div>

        {/* Music disc */}
        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center animate-float">
          <Music className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-24 left-4 right-20 text-text-white">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">@{video.username}</span>
          </div>
          <p className="text-sm leading-tight">{video.caption}</p>
          <div className="flex items-center space-x-2 text-sm">
            <Music className="w-4 h-4" />
            <span className="truncate">{video.music}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const VideoFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const diff = startY - currentY;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < SAMPLE_VIDEOS.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Handle wheel events for desktop
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && currentIndex < SAMPLE_VIDEOS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-video-bg"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <div 
        className="flex flex-col transition-transform duration-300 ease-out"
        style={{ 
          transform: `translateY(-${currentIndex * 100}vh)`,
          height: `${SAMPLE_VIDEOS.length * 100}vh`
        }}
      >
        {SAMPLE_VIDEOS.map((video, index) => (
          <VideoCard 
            key={video.id} 
            video={video} 
            isActive={index === currentIndex}
          />
        ))}
      </div>

      {/* Video progress indicator */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
        {SAMPLE_VIDEOS.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-8 rounded-full transition-all duration-200 ${
              index === currentIndex ? 'bg-text-white' : 'bg-text-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};