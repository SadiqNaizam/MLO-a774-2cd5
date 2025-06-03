import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MoreHorizontal, ThumbsUp, MessageCircle, Share2, Users2, Globe } from 'lucide-react';

export interface FeedPostCardProps {
  postId: string;
  authorName: string;
  authorAvatarUrl: string;
  authorHandle?: string;
  timestamp: string;
  privacy?: 'public' | 'friends' | 'only_me' as const;
  contentText: string;
  contentImageUrl?: string;
  location?: {
    name: string;
    type: string;
    taggedFriends?: string;
  };
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  className?: string;
}

const FeedPostCard: React.FC<FeedPostCardProps> = ({
  postId,
  authorName,
  authorAvatarUrl,
  authorHandle,
  timestamp,
  privacy = 'public' as const,
  contentText,
  contentImageUrl,
  location,
  likesCount,
  commentsCount,
  sharesCount,
  className,
}) => {
  const handleLike = React.useCallback(() => {
    console.log(`Liked post ${postId}`);
  }, [postId]);

  const handleComment = React.useCallback(() => {
    console.log(`Commented on post ${postId}`);
  }, [postId]);

  const handleShare = React.useCallback(() => {
    console.log(`Shared post ${postId}`);
  }, [postId]);

  const handleOptions = React.useCallback(() => {
    console.log(`Options for post ${postId}`);
  }, [postId]);

  const handleSaveLocation = React.useCallback(() => {
    if (location) {
      console.log(`Saved location ${location.name}`);
    }
  }, [location]);

  const getPrivacyIcon = () => {
    switch (privacy) {
      case 'friends':
        return <Users2 className="w-3.5 h-3.5 text-muted-foreground" />;
      case 'public':
        return <Globe className="w-3.5 h-3.5 text-muted-foreground" />;
      case 'only_me':
        // Using Users2 as a placeholder, could be a Lock icon if available and desired
        return <Users2 className="w-3.5 h-3.5 text-muted-foreground" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-muted-foreground" />;
    }
  };

  return (
    <Card className={cn('w-full bg-card shadow-sm', className)}>
      <CardHeader className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={authorAvatarUrl} alt={authorName} />
            <AvatarFallback>{authorName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center">
                <p className="text-sm font-semibold text-card-foreground hover:underline cursor-pointer">{authorName}</p>
                {authorHandle && <span className="ml-1 text-xs text-muted-foreground">@{authorHandle}</span>}
            </div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <span>{timestamp}</span>
              <span>·</span>
              {getPrivacyIcon()}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-muted/50 w-8 h-8" onClick={handleOptions}>
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pt-0 pb-3">
        {contentText && <p className="mb-3 text-sm text-card-foreground whitespace-pre-wrap">{contentText}</p>}
        {contentImageUrl && (
          <div className="mb-3 overflow-hidden rounded-md border border-border">
            {/* Using AspectRatio for consistent image display if needed, or simple img for natural aspect ratio */} 
            <img src={contentImageUrl} alt="Post content" className="object-cover w-full h-auto max-h-[500px]" />
          </div>
        )}
        {location && (
          <div className="p-3 border rounded-md border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-card-foreground">{location.name}</p>
                <p className="text-xs text-muted-foreground">{location.type}</p>
                {location.taggedFriends && <p className="mt-1 text-xs text-muted-foreground">{location.taggedFriends}</p>}
              </div>
              <Button variant="outline" size="sm" onClick={handleSaveLocation} className="text-sm text-primary border-primary hover:bg-primary/10 hover:text-primary">
                Save
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      {(likesCount > 0 || commentsCount > 0 || sharesCount > 0) && (
         <div className="px-4 pb-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
                {likesCount > 0 && <span className="hover:underline cursor-pointer">{likesCount} Likes</span>}
                <div className="flex space-x-3">
                    {commentsCount > 0 && <span className="hover:underline cursor-pointer">{commentsCount} Comments</span>}
                    {sharesCount > 0 && <span className="hover:underline cursor-pointer">{sharesCount} Shares</span>}
                </div>
            </div>
        </div>
      )}
      <Separator className="mx-4 bg-border" />
      <CardFooter className="p-1.5">
        <div className="flex justify-around w-full">
          <Button variant="ghost" className="flex-1 py-2.5 text-sm text-muted-foreground hover:bg-muted/50 hover:text-prd-iconGray rounded-md" onClick={handleLike}>
            <ThumbsUp className="w-[18px] h-[18px] mr-1.5 text-prd-iconGray" />
            Like
          </Button>
          <Button variant="ghost" className="flex-1 py-2.5 text-sm text-muted-foreground hover:bg-muted/50 hover:text-prd-iconGray rounded-md" onClick={handleComment}>
            <MessageCircle className="w-[18px] h-[18px] mr-1.5 text-prd-iconGray" />
            Comment
          </Button>
          <Button variant="ghost" className="flex-1 py-2.5 text-sm text-muted-foreground hover:bg-muted/50 hover:text-prd-iconGray rounded-md" onClick={handleShare}>
            <Share2 className="w-[18px] h-[18px] mr-1.5 text-prd-iconGray" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeedPostCard;
