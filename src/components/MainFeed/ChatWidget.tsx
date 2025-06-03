import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Edit3, Users, Settings2, Search } from 'lucide-react';

interface ChatContact {
  id: string;
  name: string;
  avatarUrl: string;
  onlineStatus: 'online' | 'offline' | 'away' as const;
}

interface ChatWidgetProps {
  className?: string;
}

const chatContactsData: ChatContact[] = [
  { id: 'chat1', name: 'Julia Fillory', avatarUrl: 'https://i.pravatar.cc/40?u=juliafillory', onlineStatus: 'online' as const },
  { id: 'chat2', name: 'Bryan Durand', avatarUrl: 'https://i.pravatar.cc/40?u=bryandurand', onlineStatus: 'online' as const },
  { id: 'chat3', name: 'Alex Chen', avatarUrl: 'https://i.pravatar.cc/40?u=alexchen', onlineStatus: 'offline' as const },
  { id: 'chat4', name: 'Maria Garcia', avatarUrl: 'https://i.pravatar.cc/40?u=mariagarcia', onlineStatus: 'away' as const },
  { id: 'chat5', name: 'David Miller', avatarUrl: 'https://i.pravatar.cc/40?u=davidmiller', onlineStatus: 'online' as const },
  { id: 'chat6', name: 'Sarah Wilson', avatarUrl: 'https://i.pravatar.cc/40?u=sarahwilson', onlineStatus: 'offline' as const },
  { id: 'chat7', name: 'Michael Brown', avatarUrl: 'https://i.pravatar.cc/40?u=michaelbrown', onlineStatus: 'online' as const },
  { id: 'chat8', name: 'Linda Davis', avatarUrl: 'https://i.pravatar.cc/40?u=lindadavis', onlineStatus: 'online' as const },
];

const ChatWidget: React.FC<ChatWidgetProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const handleContactClick = React.useCallback((contactId: string) => {
    console.log(`Clicked on contact ${contactId}`);
  }, []);

  const handleNewMessage = React.useCallback(() => {
    console.log('New message clicked');
  }, []);
  
  const handleGroupAction = React.useCallback(() => {
    console.log('Group action clicked');
  }, []);

  const handleChatSettings = React.useCallback(() => {
    console.log('Chat settings clicked');
  }, []);

  const filteredContacts = chatContactsData.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusDotClass = (status: 'online' | 'offline' | 'away') => {
    if (status === 'online') return 'bg-green-500';
    if (status === 'away') return 'bg-yellow-400';
    return 'bg-gray-400'; 
  };

  return (
    <div className={cn('w-full bg-card shadow-md rounded-t-lg flex flex-col h-full max-h-[450px]', className)}>
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h3 className="text-base font-semibold text-card-foreground">Chat</h3>
        <div className="flex items-center space-x-0.5">
          <Button variant="ghost" size="icon" onClick={handleNewMessage} className="text-muted-foreground hover:text-card-foreground hover:bg-muted/50 rounded-full w-8 h-8">
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleGroupAction} className="text-muted-foreground hover:text-card-foreground hover:bg-muted/50 rounded-full w-8 h-8">
            <Users className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleChatSettings} className="text-muted-foreground hover:text-card-foreground hover:bg-muted/50 rounded-full w-8 h-8">
            <Settings2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-2 border-b border-border">
        <div className="relative">
            <Input 
                type="text" 
                placeholder="Search Messenger" 
                className="w-full h-9 pl-9 text-sm bg-background rounded-full focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 border-transparent focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute w-4 h-4 top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground" />
        </div>
      </div> 

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-0.5">
          {filteredContacts.length > 0 ? filteredContacts.map((contact) => (
            <Button
              key={contact.id}
              variant="ghost"
              className="flex items-center w-full p-1.5 pr-2 space-x-2.5 rounded-md justify-start h-auto hover:bg-muted/50"
              onClick={() => handleContactClick(contact.id)}
            >
              <div className="relative flex-shrink-0">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                  <AvatarFallback>{contact.name.substring(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className={cn(
                    "absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full border-2 border-card", 
                    getStatusDotClass(contact.onlineStatus)
                  )} 
                />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium truncate text-card-foreground">{contact.name}</p>
              </div>
            </Button>
          )) : (
            <p className="p-4 text-sm text-center text-muted-foreground">No contacts found.</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatWidget;
