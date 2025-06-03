import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Archive, Settings } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Story {
  id: string;
  userName: string;
  avatarUrl: string;
  storyImageUrl: string;
  isViewed?: boolean;
}

interface StoriesWidgetProps {
  className?: string;
  currentUserAvatarUrl?: string;
  currentUserName?: string;
}

const storiesData: Story[] = [
  { id: 'story1', userName: 'Sophia M.', avatarUrl: 'https://i.pravatar.cc/150?u=sophia', storyImageUrl: 'https://picsum.photos/seed/story1/200/320', isViewed: false },
  { id: 'story2', userName: 'Liam G.', avatarUrl: 'https://i.pravatar.cc/150?u=liam', storyImageUrl: 'https://picsum.photos/seed/story2/200/320', isViewed: true },
  { id: 'story3', userName: 'Olivia R.', avatarUrl: 'https://i.pravatar.cc/150?u=olivia', storyImageUrl: 'https://picsum.photos/seed/story3/200/320', isViewed: false },
  { id: 'story4', userName: 'Noah S.', avatarUrl: 'https://i.pravatar.cc/150?u=noah', storyImageUrl: 'https://picsum.photos/seed/story4/200/320', isViewed: false },
  { id: 'story5', userName: 'Ava W.', avatarUrl: 'https://i.pravatar.cc/150?u=ava', storyImageUrl: 'https://picsum.photos/seed/story5/200/320', isViewed: true },
  { id: 'story6', userName: 'Jackson B.', avatarUrl: 'https://i.pravatar.cc/150?u=jackson', storyImageUrl: 'https://picsum.photos/seed/story6/200/320', isViewed: false },
];

const StoriesWidget: React.FC<StoriesWidgetProps> = ({
  className,
  currentUserAvatarUrl = 'https://i.pravatar.cc/150?u=currentuser',
  currentUserName = 'Your Story'
}) => {
  
  const handleAddStory = React.useCallback(() => {
    console.log('Add to story clicked');
  }, []);

  const handleViewStory = React.useCallback((storyId: string) => {
    console.log(`View story ${storyId} clicked`);
  }, []);

  const handleArchive = React.useCallback(() => {
    console.log('Archive clicked');
  }, []);

  const handleSettings = React.useCallback(() => {
    console.log('Settings clicked');
  }, []);

  return (
    <Card className={cn('w-full bg-card shadow-sm', className)}>
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
        <CardTitle className="text-base font-semibold text-card-foreground">Stories</CardTitle>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" onClick={handleArchive} className="text-xs text-primary hover:bg-primary/10 px-2">
            <Archive className="w-3.5 h-3.5 mr-1" />
            Archive
          </Button>
          <Button variant="ghost" size="sm" onClick={handleSettings} className="text-xs text-primary hover:bg-primary/10 px-2">
            <Settings className="w-3.5 h-3.5 mr-1" />
            Settings
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-1">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex pb-2 space-x-2.5">
            {/* Add to Your Story Item */}
            <button
              onClick={handleAddStory}
              className="flex-shrink-0 w-[100px] h-[160px] rounded-lg overflow-hidden relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-border shadow-sm"
              aria-label="Add to your story"
            >
              <img 
                  src={currentUserAvatarUrl} 
                  alt="Create a story background" 
                  className="object-cover w-full h-[calc(100%-40px)] transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[50px] bg-card flex flex-col items-center justify-end pb-1.5">
                 <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                    <Plus className="w-5 h-5 text-primary-foreground" />
                </div>
                <p className="text-xs font-medium text-center text-card-foreground">Add to Story</p>
              </div>
            </button>

            {/* Other Stories */}
            {storiesData.map((story) => (
              <button
                key={story.id}
                onClick={() => handleViewStory(story.id)}
                className={cn(
                  "flex-shrink-0 relative w-[100px] h-[160px] rounded-lg overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-sm",
                  story.isViewed ? "opacity-80" : ""
                )}
                aria-label={`View ${story.userName}'s story`}
              >
                <img 
                    src={story.storyImageUrl}
                    alt={`${story.userName}'s story preview`}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
                <Avatar className={cn(
                    "absolute w-8 h-8 top-2 left-2 border-2",
                    story.isViewed ? "border-muted-foreground/70" : "border-primary"
                )}>
                  <AvatarImage src={story.avatarUrl} alt={story.userName} />
                  <AvatarFallback>{story.userName.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <p className="absolute bottom-1.5 left-0 right-0 px-1.5 text-xs font-medium text-white truncate text-center">{story.userName}</p>
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StoriesWidget;
