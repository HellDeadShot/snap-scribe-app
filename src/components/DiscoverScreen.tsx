import { useState } from 'react';
import { Search, TrendingUp, Hash, Music, Play } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TRENDING_HASHTAGS = [
  { tag: 'fyp', posts: '2.3M', color: 'bg-gradient-primary' },
  { tag: 'viral', posts: '1.8M', color: 'bg-gradient-accent' },
  { tag: 'dance', posts: '956K', color: 'bg-gradient-primary' },
  { tag: 'comedy', posts: '743K', color: 'bg-gradient-accent' },
  { tag: 'food', posts: '632K', color: 'bg-gradient-primary' },
  { tag: 'travel', posts: '589K', color: 'bg-gradient-accent' }
];

const TRENDING_SOUNDS = [
  { title: 'Original Sound', artist: 'viral_creator', uses: '125.4K', thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop' },
  { title: 'Trending Beat', artist: 'music_producer', uses: '89.2K', thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=60&h=60&fit=crop' },
  { title: 'Viral Song', artist: 'popular_artist', uses: '67.8K', thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=60&h=60&fit=crop' },
  { title: 'Dance Mix', artist: 'dj_master', uses: '54.3K', thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop' }
];

const FEATURED_VIDEOS = [
  { id: '1', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=200&fit=crop', views: '2.3M' },
  { id: '2', thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150&h=200&fit=crop', views: '1.8M' },
  { id: '3', thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=200&fit=crop', views: '1.2M' },
  { id: '4', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=200&fit=crop', views: '956K' },
  { id: '5', thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150&h=200&fit=crop', views: '743K' },
  { id: '6', thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=200&fit=crop', views: '632K' }
];

const HashtagCard = ({ tag, posts, color }: { tag: string; posts: string; color: string }) => (
  <div className="bg-card rounded-lg p-4 space-y-2 cursor-pointer hover:bg-card/80 transition-colors">
    <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
      <Hash className="w-6 h-6 text-white" />
    </div>
    <div>
      <h3 className="font-semibold">#{tag}</h3>
      <p className="text-sm text-muted-foreground">{posts} posts</p>
    </div>
  </div>
);

const SoundCard = ({ sound }: { sound: typeof TRENDING_SOUNDS[0] }) => (
  <div className="flex items-center space-x-3 p-3 bg-card rounded-lg hover:bg-card/80 transition-colors cursor-pointer">
    <img src={sound.thumbnail} alt={sound.title} className="w-12 h-12 rounded-lg object-cover" />
    <div className="flex-1 min-w-0">
      <h3 className="font-medium truncate">{sound.title}</h3>
      <p className="text-sm text-muted-foreground">by {sound.artist}</p>
    </div>
    <div className="text-right">
      <p className="text-sm font-medium">{sound.uses}</p>
      <p className="text-xs text-muted-foreground">uses</p>
    </div>
    <Button variant="ghost" size="sm" className="text-primary">
      <Music className="w-4 h-4" />
    </Button>
  </div>
);

export const DiscoverScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Discover</h1>
          <TrendingUp className="w-6 h-6 text-primary" />
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users, sounds, hashtags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-0 focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4">
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="sounds">Sounds</TabsTrigger>
            <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trending" className="mt-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Featured Videos</h2>
              <div className="grid grid-cols-2 gap-3">
                {FEATURED_VIDEOS.map((video) => (
                  <div key={video.id} className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden group cursor-pointer">
                    <img 
                      src={video.thumbnail} 
                      alt="Featured video"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-200" />
                    <div className="absolute bottom-3 left-3 flex items-center space-x-1 text-white text-sm font-medium">
                      <Play className="w-4 h-4 fill-current" />
                      <span>{video.views}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-3">Trending Hashtags</h2>
              <div className="grid grid-cols-2 gap-3">
                {TRENDING_HASHTAGS.slice(0, 4).map((hashtag) => (
                  <HashtagCard key={hashtag.tag} {...hashtag} />
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sounds" className="mt-6">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Trending Sounds</h2>
              {TRENDING_SOUNDS.map((sound, index) => (
                <SoundCard key={index} sound={sound} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hashtags" className="mt-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Popular Hashtags</h2>
              <div className="grid grid-cols-1 gap-3">
                {TRENDING_HASHTAGS.map((hashtag) => (
                  <HashtagCard key={hashtag.tag} {...hashtag} />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};