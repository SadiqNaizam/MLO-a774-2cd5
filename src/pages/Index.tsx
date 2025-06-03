import React from 'react';
import TopHeader from '../../components/layout/TopHeader';
import SidebarNavigation from '../../components/layout/SidebarNavigation';
import FeedPostCard, { FeedPostCardProps } from '../../components/MainFeed/FeedPostCard';
import StoriesWidget from '../../components/MainFeed/StoriesWidget';
import SuggestedGroupsWidget from '../../components/MainFeed/SuggestedGroupsWidget';
import ChatWidget from '../../components/MainFeed/ChatWidget';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { List, Image as ImageIcon, UserPlus, MoreHorizontal } from 'lucide-react';

// Dummy data for Feed Posts
const feedPostsData: FeedPostCardProps[] = [
  {
    postId: 'post1',
    authorName: 'Julia Fillory',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=juliafillory',
    authorHandle: 'juliaf',
    timestamp: '2 hrs ago',
    privacy: 'public' as const,
    contentText: 'Checking out some new stores downtown!',
    contentImageUrl: 'https://source.unsplash.com/random/800x500?city,map&sig=raleighmap',
    location: {
      name: 'Raleigh, North Carolina',
      type: 'City - United States',
      taggedFriends: 'Bryan Durand and 2 others have been here',
    },
    likesCount: 125,
    commentsCount: 12,
    sharesCount: 5,
  },
  {
    postId: 'post2',
    authorName: 'Mark Johnson',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=markjohnson',
    authorHandle: 'markj',
    timestamp: '5 hrs ago',
    privacy: 'friends' as const,
    contentText: 'Just enjoyed a great book! Highly recommend "The Midnight Library". What are you all reading these days? #booklover #reading',
    contentImageUrl: undefined,
    location: undefined,
    likesCount: 78,
    commentsCount: 23,
    sharesCount: 2,
  },
  {
    postId: 'post3',
    authorName: 'Alice Wonderland',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=alicew',
    timestamp: '1 day ago',
    privacy: 'public' as const,
    contentText: 'Beautiful sunset at the beach today! 🌅 #sunset #beachlife #nature',
    contentImageUrl: 'https://source.unsplash.com/random/800x600?sunset,beach&sig=post3image',
    location: undefined,
    likesCount: 210,
    commentsCount: 35,
    sharesCount: 15,
  },
];

// Placeholder for "Create Post" component mimicking common social media UI
const CreatePostPlaceholder: React.FC = () => {
  return (
    <Card className="bg-card shadow-sm">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center space-x-2 sm:space-x-3 mb-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://i.pravatar.cc/40?u=olennamason" alt="Olenna Mason" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <Button 
            variant="ghost" 
            className="flex-1 justify-start h-10 px-4 rounded-full bg-muted hover:bg-muted/90 text-muted-foreground text-sm sm:text-base"
            onClick={() => console.log('Open create post modal')}
          >
            What's on your mind, Olenna?
          </Button>
        </div>
        <div className="flex justify-around pt-3 border-t border-border -mx-3 sm:-mx-4 px-1 sm:px-2">
          <Button variant="ghost" className="flex-1 text-xs sm:text-sm text-muted-foreground hover:bg-muted/50 hover:text-card-foreground rounded-md py-2.5 group">
            <List className="w-5 h-5 mr-1.5 text-muted-foreground group-hover:text-card-foreground" /> List
          </Button>
          <Button variant="ghost" className="flex-1 text-xs sm:text-sm text-muted-foreground hover:bg-muted/50 hover:text-card-foreground rounded-md py-2.5 group">
            <ImageIcon className="w-5 h-5 mr-1.5 text-muted-foreground group-hover:text-card-foreground" /> Photo/Video
          </Button>
          <Button variant="ghost" className="flex-1 text-xs sm:text-sm text-muted-foreground hover:bg-muted/50 hover:text-card-foreground rounded-md py-2.5 group">
            <UserPlus className="w-5 h-5 mr-1.5 text-muted-foreground group-hover:text-card-foreground" /> Tag Friends
          </Button>
           <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-muted/50 hover:text-card-foreground rounded-md w-10 h-10 sm:w-auto sm:h-auto sm:px-2 sm:py-2.5 sm:flex-none group">
            <MoreHorizontal className="w-5 h-5 text-muted-foreground group-hover:text-card-foreground" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const FeedPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopHeader />
      {/* pt-16 for fixed header height (h-16 from layout requirements) */}
      <div className="flex-1 flex pt-16">
        {/* Left Sidebar - w-60 (240px) from layout requirements */} 
        <aside className="w-60 h-[calc(100vh-4rem)] fixed top-16 left-0 bg-sidebar text-sidebar-foreground overflow-y-auto p-4 border-r border-border hidden md:block">
          <SidebarNavigation />
        </aside>

        {/* Main Content Area */} 
        {/* Margins adjust based on visible fixed sidebars: md:ml-60 for left, lg:mr-72 for right */} 
        <main className="flex-1 bg-background overflow-y-auto md:ml-60 lg:mr-72">
          {/* Inner div for padding and max-width, consistent with layout patterns */} 
          <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
             {/* space-y-6 for gap between items in main feed, from layout requirements */} 
             <div className="space-y-6">
               <CreatePostPlaceholder />
               {feedPostsData.map((post) => (
                 <FeedPostCard key={post.postId} {...post} />
               ))}
             </div>
          </div>
        </main>

        {/* Right Sidebar - w-72 (288px) from layout requirements */} 
        <aside className="w-72 h-[calc(100vh-4rem)] fixed top-16 right-0 bg-surface text-card-foreground overflow-y-auto p-4 border-l border-border hidden lg:block">
          {/* Widgets for the right sidebar */} 
          <div className="space-y-6">
            <StoriesWidget />
            <SuggestedGroupsWidget />
            <ChatWidget />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default FeedPage;
