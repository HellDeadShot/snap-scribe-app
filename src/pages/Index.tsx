import { useState, useEffect } from 'react';
import { VideoFeed } from '@/components/VideoFeed';
import { BottomNavigation } from '@/components/BottomNavigation';
import { ProfileScreen } from '@/components/ProfileScreen';
import { DiscoverScreen } from '@/components/DiscoverScreen';
import { AuthScreen } from '@/components/AuthScreen';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  // Mock authentication check
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    toast({
      title: "Welcome back!",
      description: "You've successfully signed in.",
    });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setActiveTab('home');
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
  };

  // Show auth screen if not logged in
  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  // Handle upload tab - show toast for now
  const handleTabChange = (tab: string) => {
    if (tab === 'upload') {
      toast({
        title: "Upload Feature",
        description: "Upload functionality coming soon! 📹",
      });
      return;
    }
    
    if (tab === 'notifications') {
      toast({
        title: "Notifications",
        description: "No new notifications at the moment.",
      });
      return;
    }
    
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <VideoFeed />;
      case 'discover':
        return <DiscoverScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <VideoFeed />;
    }
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Main Content */}
      <div className="h-screen">
        {renderContent()}
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default Index;
