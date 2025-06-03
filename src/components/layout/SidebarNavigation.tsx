import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Newspaper,
  MessageSquare,
  PlaySquare,
  Store,
  Gamepad2,
  CalendarDays,
  Flag,
  Users,
  ListChecks,
  HeartHandshake,
  ChevronDown,
  PlusCircle,
  Megaphone,
  FilePlus2,
  UserPlus,
  CalendarPlus,
  Gift
} from 'lucide-react';

interface NavItemProps {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  isActive?: boolean;
  isPictured?: boolean;
  pictureUrl?: string;
  count?: number | string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  icon: IconComponent,
  href = '#',
  isActive,
  isPictured,
  pictureUrl,
  count,
  onClick,
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center space-x-3 px-2 py-1.5 rounded-md text-sm group',
        isActive
          ? 'bg-primary/10 text-primary font-semibold'
          : 'text-sidebar-foreground hover:bg-muted hover:text-sidebar-foreground',
        onClick ? 'cursor-pointer' : ''
      )}
    >
      {isPictured && pictureUrl ? (
        <img src={pictureUrl} alt={label} className="w-6 h-6 rounded-sm object-cover" />
      ) : (
        <IconComponent className={cn('w-5 h-5', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-sidebar-foreground')} />
      )}
      <span className="flex-1 truncate">{label}</span>
      {count && (
        <Badge variant="secondary" className="h-5 px-1.5 text-xs font-normal">
          {count}
        </Badge>
      )}
    </a>
  );
};

interface NavSectionProps {
  title?: string;
  items: NavItemProps[];
  isCreateLinks?: boolean;
}

const NavSection: React.FC<NavSectionProps> = ({ title, items, isCreateLinks }) => {
  if (isCreateLinks) {
    return (
      <div className="pt-2">
        {title && <h3 className="px-2 mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</h3>}
        <div className="px-2 py-1.5 text-sm text-muted-foreground">
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <a href={item.href || '#'} className="hover:underline text-primary">
                {item.label}
              </a>
              {index < items.length - 1 && <span className="mx-1">·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1 py-1">
      {title && <h3 className="px-2 pt-2 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</h3>}
      {items.map((item) => (
        <NavItem key={item.id} {...item} />
      ))}
    </div>
  );
};

const SidebarNavigation: React.FC = () => {
  const userProfile: NavItemProps = {
    id: 'user-profile',
    label: 'Olenna Mason',
    icon: Users, // Placeholder, Avatar is separate
    href: '#user-profile',
    isPictured: true,
    pictureUrl: 'https://i.pravatar.cc/40?u=olennamason',
  };

  const mainNavItems: NavItemProps[] = [
    { id: 'news-feed', label: 'News Feed', icon: Newspaper, href: '#news-feed', isActive: true },
    { id: 'messenger', label: 'Messenger', icon: MessageSquare, href: '#messenger' },
    { id: 'watch', label: 'Watch', icon: PlaySquare, href: '#watch', count: '9+' },
    { id: 'marketplace', label: 'Marketplace', icon: Store, href: '#marketplace' },
  ];

  const shortcutsItems: NavItemProps[] = [
    { id: 'farmville-2', label: 'FarmVille 2', icon: Gamepad2, href: '#farmville', isPictured: true, pictureUrl: 'https://i.pravatar.cc/40?u=farmville2&img=50' }, 
    // Add more shortcuts if needed
  ];

  const exploreItems: NavItemProps[] = [
    { id: 'events', label: 'Events', icon: CalendarDays, href: '#events', count: '12' },
    { id: 'pages', label: 'Pages', icon: Flag, href: '#pages', count: '3' },
    { id: 'groups', label: 'Groups', icon: Users, href: '#groups', count: '5 New' },
    { id: 'friend-lists', label: 'Friend Lists', icon: ListChecks, href: '#friend-lists' },
    { id: 'fundraisers', label: 'Fundraisers', icon: HeartHandshake, href: '#fundraisers' },
    { id: 'see-more-explore', label: 'See More...', icon: ChevronDown, href: '#see-more-explore', onClick: () => console.log('See More Explore clicked') },
  ];
  
  const createItems: NavItemProps[] = [
    { id: 'create-ad', label: 'Ad', icon: Megaphone, href: '#create-ad' },
    { id: 'create-page', label: 'Page', icon: FilePlus2, href: '#create-page' },
    { id: 'create-group', label: 'Group', icon: UserPlus, href: '#create-group' },
    { id: 'create-event', label: 'Event', icon: CalendarPlus, href: '#create-event' },
    { id: 'create-fundraiser', label: 'Fundraiser', icon: Gift, href: '#create-fundraiser' },
  ];

  return (
    <nav className="flex flex-col h-full space-y-1 text-sidebar-foreground">
      {/* User Profile Link */}
      <a href={userProfile.href} className='block'>
        <div className="flex items-center space-x-2 p-2 -mx-2 rounded-md hover:bg-muted cursor-pointer">
          <Avatar className="w-7 h-7">
            <AvatarImage src={userProfile.pictureUrl} alt={userProfile.label} />
            <AvatarFallback>{userProfile.label.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-sm text-sidebar-foreground truncate">{userProfile.label}</span>
        </div>
      </a>

      <NavSection items={mainNavItems} />
      <Separator className="my-2 bg-border/70" />
      <NavSection title="Shortcuts" items={shortcutsItems} />
      <Separator className="my-2 bg-border/70" />
      <NavSection title="Explore" items={exploreItems} />
      <Separator className="my-2 bg-border/70" />
      <NavSection title="Create" items={createItems} isCreateLinks={true} />
      
      {/* Footer links if any, e.g., Privacy, Terms - not in image */}
      <div className="mt-auto pt-4 text-xs text-muted-foreground">
        <a href="#privacy" className="hover:underline">Privacy</a> · 
        <a href="#terms" className="hover:underline">Terms</a> · 
        <a href="#cookies" className="hover:underline">Cookies</a> · More
        <p className='mt-1'>Social Feed UI &copy; {new Date().getFullYear()}</p>
      </div>
    </nav>
  );
};

export default SidebarNavigation;
