import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface GroupSuggestion {
  id: string;
  name: string;
  memberCount: number;
  coverImageUrl: string;
  memberAvatarsUrl: string[];
  tagline?: string; 
}

interface SuggestedGroupsWidgetProps {
  className?: string;
}

const suggestedGroupsData: GroupSuggestion[] = [
  {
    id: 'group1',
    name: 'Mad Men',
    tagline: '(MADdicts)',
    memberCount: 6195,
    coverImageUrl: 'https://source.unsplash.com/random/300x100?sig=1&abstract',
    memberAvatarsUrl: [
      'https://i.pravatar.cc/40?u=member1sg1',
      'https://i.pravatar.cc/40?u=member2sg1',
      'https://i.pravatar.cc/40?u=member3sg1',
      'https://i.pravatar.cc/40?u=member4sg1',
      'https://i.pravatar.cc/40?u=member5sg1',
    ],
  },
  {
    id: 'group2',
    name: 'Dexter Morgan',
    memberCount: 6984,
    coverImageUrl: 'https://source.unsplash.com/random/300x100?sig=2&dark,moody',
    memberAvatarsUrl: [
      'https://i.pravatar.cc/40?u=member1sg2',
      'https://i.pravatar.cc/40?u=member2sg2',
      'https://i.pravatar.cc/40?u=member3sg2',
    ],
  },
  {
    id: 'group3',
    name: 'Sci-Fi Readers Club',
    memberCount: 2450,
    coverImageUrl: 'https://source.unsplash.com/random/300x100?sig=3&space,stars',
    memberAvatarsUrl: [
      'https://i.pravatar.cc/40?u=member1sg3',
      'https://i.pravatar.cc/40?u=member2sg3',
      'https://i.pravatar.cc/40?u=member3sg3',
      'https://i.pravatar.cc/40?u=member4sg3',
    ],
  }
];

const SuggestedGroupsWidget: React.FC<SuggestedGroupsWidgetProps> = ({ className }) => {
  
  const handleJoinGroup = React.useCallback((groupId: string, groupName: string) => {
    console.log(`Join group ${groupName} (ID: ${groupId}) clicked`);
  }, []);

  const handleSeeAll = React.useCallback(() => {
    console.log('See All suggested groups clicked');
  }, []);

  return (
    <Card className={cn('w-full bg-card shadow-sm', className)}>
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-3">
        <CardTitle className="text-base font-semibold text-card-foreground">Suggested Groups</CardTitle>
        <Button variant="link" size="sm" onClick={handleSeeAll} className="px-0 text-sm text-primary hover:underline h-auto py-0">
          See All
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        {suggestedGroupsData.map((group) => (
          <div key={group.id} className="overflow-hidden border rounded-lg border-border shadow-sm">
            <div className="relative h-24 bg-muted"> 
              <img 
                src={group.coverImageUrl} 
                alt={`${group.name} cover`}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-2 left-3 flex -space-x-2 rtl:space-x-reverse">
                {group.memberAvatarsUrl.slice(0, 5).map((avatarUrl, index) => (
                  <Avatar key={index} className="w-7 h-7 border-2 border-card shadow-md">
                    <AvatarImage src={avatarUrl} alt={`Member ${index + 1}`} />
                    <AvatarFallback>{group.name.substring(0,1)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
            <div className="p-3">
              <h4 className="text-sm font-semibold text-card-foreground truncate">
                {group.name} {group.tagline && <span className="font-normal text-muted-foreground">{group.tagline}</span>}
              </h4>
              <p className="text-xs text-muted-foreground">
                {group.memberCount.toLocaleString()} members
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2.5 text-sm text-primary border-primary hover:bg-primary/10 hover:text-primary"
                onClick={() => handleJoinGroup(group.id, group.name)}
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Join
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SuggestedGroupsWidget;
