import { Home, Search, Plus, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discover', icon: Search, label: 'Discover' },
    { id: 'upload', icon: Plus, label: 'Upload' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-nav-bg border-t border-nav-border z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isUpload = item.id === 'upload';
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center space-y-1 p-2 min-w-0 ${
                isUpload 
                  ? 'bg-gradient-primary text-white hover:opacity-80 rounded-lg' 
                  : isActive 
                    ? 'text-text-white' 
                    : 'text-text-gray hover:text-text-white'
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className={`${isUpload ? 'w-6 h-6' : 'w-5 h-5'}`} />
              <span className={`text-xs font-medium ${isUpload ? 'hidden' : ''}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};