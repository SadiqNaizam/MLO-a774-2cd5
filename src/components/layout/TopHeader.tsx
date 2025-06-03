import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Facebook,
  Search,
  Home,
  Users,
  UserPlus,
  MessageCircle,
  Bell,
  HelpCircle,
  ChevronDown,
  LayoutGrid, // Placeholder for Create Post/Menu icon
  PlaySquare,
  Store,
  Users2
} from 'lucide-react';

interface HeaderNavLinkProps {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive?: boolean;
  ariaLabel?: string;
}

const HeaderNavLink: React.FC<HeaderNavLinkProps> = ({ href, label, icon: Icon, isActive, ariaLabel }) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={href}
            aria-label={ariaLabel || label}
            className={cn(
              'flex items-center justify-center h-full px-3 sm:px-5 border-b-2 text-primary-foreground/80 hover:bg-white/10 transition-colors',
              isActive ? 'border-white text-primary-foreground' : 'border-transparent hover:text-primary-foreground'
            )}
          >
            <Icon className="w-6 h-6" />
          </a>
        </TooltipTrigger>
        <TooltipContent className="bg-background text-foreground border-border">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface QuickActionProps {
  label: string;
  icon: React.ElementType;
  badgeCount?: number;
  onClick?: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ label, icon: Icon, badgeCount, onClick }) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full w-10 h-10 text-primary-foreground hover:bg-white/20 focus-visible:bg-white/20 focus-visible:ring-offset-primary focus-visible:ring-white"
            aria-label={label}
            onClick={onClick}
          >
            <Icon className="w-5 h-5" />
            {badgeCount && badgeCount > 0 && (
              <Badge className="absolute top-1 right-1 flex items-center justify-center p-0 h-[18px] min-w-[18px] text-xs font-semibold bg-red-500 text-white border-2 border-primary rounded-full">
                {badgeCount > 99 ? '99+' : badgeCount}
              </Badge>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-background text-foreground border-border">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const TopHeader: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  // Based on common Facebook layout, may differ from specific screenshot details for center nav.
  // The provided screenshot shows text links "Home", "Find Friends" in the middle-left, then user avatar and name.
  // This implementation uses common icon-based center navigation for a typical FB-like UI.
  const centerNavItems: HeaderNavLinkProps[] = [
    { href: '#home', label: 'Home', icon: Home, isActive: true },
    { href: '#friends', label: 'Friends', icon: Users2 }, // Users2 is more generic than UserSearch
    { href: '#watch', label: 'Watch', icon: PlaySquare },
    { href: '#marketplace', label: 'Marketplace', icon: Store },
    { href: '#groups', label: 'Groups', icon: Users },
  ];

  const quickActionItems: QuickActionProps[] = [
    { label: 'Create', icon: LayoutGrid, onClick: () => console.log('Create clicked') }, // Often a Plus or Grid icon
    { label: 'Friend Requests', icon: UserPlus, badgeCount: 8, onClick: () => console.log('Friend Requests clicked') },
    { label: 'Messenger', icon: MessageCircle, badgeCount: 5, onClick: () => console.log('Messenger clicked') }, // Example badge count
    { label: 'Notifications', icon: Bell, badgeCount: 36, onClick: () => console.log('Notifications clicked') },
    { label: 'Account', icon: ChevronDown, onClick: () => console.log('Account menu clicked') }, // HelpCircle could be part of this dropdown
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-20 h-16 bg-primary text-primary-foreground flex items-center justify-between px-2 sm:px-4 shadow-md">
      {/* Left Section: Logo and Search */} 
      <div className="flex items-center space-x-2">
        <a href="#home" aria-label="Homepage">
          <Facebook className="w-10 h-10 text-white" />
        </a>
        <div className="relative hidden md:block">
          <Input
            type="search"
            placeholder="Search Social Feed"
            className="h-10 w-60 pl-10 pr-3 rounded-full bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/70 border-transparent focus:bg-white focus:text-card-foreground focus:placeholder:text-muted-foreground focus:border-ring focus-visible:ring-offset-0 focus-visible:ring-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/70" />
        </div>
      </div>

      {/* Center Section: Navigation Links */} 
      <nav className="hidden lg:flex items-center justify-center h-full flex-1">
        <div className="flex h-full">
          {centerNavItems.map((item) => (
            <HeaderNavLink key={item.label} {...item} />
          ))}
        </div>
      </nav>
      
      {/* Right Section: User Profile & Quick Actions */} 
      <div className="flex items-center space-x-1 sm:space-x-2">
        <Button variant="ghost" className="rounded-full px-2 py-1 h-auto flex items-center space-x-2 text-primary-foreground hover:bg-white/20 focus-visible:bg-white/20 focus-visible:ring-offset-primary focus-visible:ring-white">
          <Avatar className="w-7 h-7 border-2 border-transparent group-hover:border-white/50">
            <AvatarImage src="https://i.pravatar.cc/40?u=olennamason" alt="Olenna Mason" />
            <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground">OM</AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold hidden xl:block">Olenna</span>
        </Button>
        
        <div className="flex items-center">
          {quickActionItems.map((item) => (
            <QuickAction key={item.label} {...item} />
          ))}
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
