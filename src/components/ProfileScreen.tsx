import { useState } from 'react';
import { Heart, MessageCircle, Play, Settings, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MOCK_USER = {
  username: 'johndoe',
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  followers: 125400,
  following: 892,
  likes: 1200000,
  bio: '✨ Content Creator\n🎬 Filmmaker\n📍 Los Angeles',
  verified: true
};

const MOCK_VIDEOS = [
  { id: '1', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=200&fit=crop', views: '125K', likes: '12.4K' },
  { id: '2', thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150&h=200&fit=crop', views: '89K', likes: '8.9K' },
  { id: '3', thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=200&fit=crop', views: '203K', likes: '25.1K' },
  { id: '4', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=200&fit=crop', views: '67K', likes: '6.7K' },
  { id: '5', thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150&h=200&fit=crop', views: '156K', likes: '18.3K' },
  { id: '6', thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=200&fit=crop', views: '92K', likes: '11.2K' }
];

const formatCount = (count: number) => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};

const VideoGrid = ({ videos }: { videos: typeof MOCK_VIDEOS }) => (
  <div className="grid grid-cols-3 gap-1">
    {videos.map((video) => (
      <div key={video.id} className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden group cursor-pointer">
        <img 
          src={video.thumbnail} 
          alt="Video thumbnail"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-200" />
        <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-white text-xs">
          <Play className="w-3 h-3 fill-current" />
          <span>{video.views}</span>
        </div>
        <div className="absolute bottom-2 right-2 flex items-center space-x-1 text-white text-xs">
          <Heart className="w-3 h-3 fill-current" />
          <span>{video.likes}</span>
        </div>
      </div>
    ))}
  </div>
);

export const ProfileScreen = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold">{MOCK_USER.username}</h1>
          {MOCK_USER.verified && (
            <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>
        <Button variant="ghost" size="sm">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Profile Info */}
      <div className="p-4 space-y-4">
        <div className="flex items-start space-x-4">
          <img
            src={MOCK_USER.avatar}
            alt={MOCK_USER.name}
            className="w-20 h-20 rounded-full border-2 border-primary"
          />
          <div className="flex-1 space-y-3">
            <div className="flex items-center space-x-4 text-center">
              <div>
                <div className="text-xl font-bold">{formatCount(MOCK_USER.following)}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
              <div>
                <div className="text-xl font-bold">{formatCount(MOCK_USER.followers)}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div>
                <div className="text-xl font-bold">{formatCount(MOCK_USER.likes)}</div>
                <div className="text-sm text-muted-foreground">Likes</div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant={isFollowing ? "secondary" : "default"}
                size="sm"
                className="flex-1"
                onClick={() => setIsFollowing(!isFollowing)}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <h2 className="font-semibold">{MOCK_USER.name}</h2>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {MOCK_USER.bio}
          </p>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="px-4">
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="videos" className="flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Videos</span>
            </TabsTrigger>
            <TabsTrigger value="liked" className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Liked</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Saved</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="videos" className="mt-4">
            <VideoGrid videos={MOCK_VIDEOS} />
          </TabsContent>
          
          <TabsContent value="liked" className="mt-4">
            <VideoGrid videos={MOCK_VIDEOS.slice(0, 4)} />
          </TabsContent>
          
          <TabsContent value="saved" className="mt-4">
            <div className="text-center py-12 text-muted-foreground">
              <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No saved videos yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};