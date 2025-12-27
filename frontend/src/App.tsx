import { useState } from 'react';
import { Search, UserPlus, Users as UsersIcon, Menu, LogOut } from 'lucide-react';
import { ContactListItem } from './components/ContactListItem';
import { GroupListItem } from './components/GroupListItem';
import { ChatMessage } from './components/ChatMessage';
import { ChatHeader } from './components/ChatHeader';
import { MessageInput } from './components/MessageInput';
import { TypingIndicator } from './components/TypingIndicator';
import { AddContactModal } from './components/AddContactModal';
import { CreateGroupModal } from './components/CreateGroupModal';
import { LoginScreen } from './components/LoginScreen';
import { WelcomeTransition } from './components/WelcomeTransition';
import { LogoutConfirmModal } from './components/LogoutConfirmModal';

interface Contact {
  id: string;
  name: string;
  status: string;
  isOnline: boolean;
  unreadCount: number;
}

interface Group {
  id: string;
  name: string;
  memberIds: string[];
  memberCount: number;
  lastMessage?: string;
  unreadCount: number;
}

interface Message {
  id: string;
  text: string;
  time: string;
  isOutgoing: boolean;
  sender?: string;
  senderId?: string;
}

interface Chat {
  id: string;
  type: 'contact' | 'group';
  messages: Message[];
}

type AppState = 'login' | 'welcome' | 'chat';

const initialContacts: Contact[] = [
  { id: '1', name: 'Sarah Thompson', status: 'Listening to music 🎵', isOnline: true, unreadCount: 2 },
  { id: '2', name: 'Mike Chen', status: 'At work', isOnline: true, unreadCount: 0 },
  { id: '3', name: 'Emily Rodriguez', status: 'Be right back', isOnline: true, unreadCount: 0 },
  { id: '4', name: 'Alex Johnson', status: 'Out to lunch', isOnline: false, unreadCount: 0 },
  { id: '5', name: 'Jessica Park', status: 'On the phone', isOnline: true, unreadCount: 1 },
  { id: '6', name: 'David Kim', status: 'Away', isOnline: true, unreadCount: 0 },
  { id: '7', name: 'Rachel Adams', status: 'Busy - do not disturb', isOnline: false, unreadCount: 0 },
];

const initialGroups: Group[] = [
  { id: 'g1', name: 'Project Team', memberIds: ['1', '2', '3'], memberCount: 3, lastMessage: 'Meeting at 3pm', unreadCount: 5 },
  { id: 'g2', name: 'Weekend Plans', memberIds: ['1', '5', '6'], memberCount: 3, lastMessage: 'See you Saturday!', unreadCount: 0 },
];

const initialChats: { [key: string]: Chat } = {
  '1': {
    id: '1',
    type: 'contact',
    messages: [
      { id: '1', text: 'Hey! Did you see the new design mockups?', time: '2:34 PM', isOutgoing: false, sender: 'Sarah Thompson' },
      { id: '2', text: 'Yes! They look amazing. I love the retro aesthetic.', time: '2:35 PM', isOutgoing: true },
      { id: '3', text: 'Right?? It reminds me of the good old MSN days 😊', time: '2:35 PM', isOutgoing: false, sender: 'Sarah Thompson' },
      { id: '4', text: 'Totally! The glossy buttons are perfect. Very 1999.', time: '2:36 PM', isOutgoing: true },
      { id: '5', text: 'Should we add some more features to the prototype?', time: '2:37 PM', isOutgoing: false, sender: 'Sarah Thompson' },
    ]
  },
  'g1': {
    id: 'g1',
    type: 'group',
    messages: [
      { id: '1', text: 'Hi everyone! Ready for the standup?', time: '10:00 AM', isOutgoing: false, sender: 'Mike Chen', senderId: '2' },
      { id: '2', text: 'Yes! Just finishing up my tasks.', time: '10:01 AM', isOutgoing: false, sender: 'Emily Rodriguez', senderId: '3' },
      { id: '3', text: 'I have some updates to share today.', time: '10:02 AM', isOutgoing: true },
      { id: '4', text: 'Great! Let\'s start in 5 minutes.', time: '10:03 AM', isOutgoing: false, sender: 'Mike Chen', senderId: '2' },
      { id: '5', text: 'Perfect, see you then!', time: '10:04 AM', isOutgoing: false, sender: 'Sarah Thompson', senderId: '1' },
    ]
  }
};

export default function App() {
  const [appState, setAppState] = useState<AppState>('login');
  const [currentUser, setCurrentUser] = useState<string>('');
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [chats, setChats] = useState<{ [key: string]: Chat }>(initialChats);
  const [activeChat, setActiveChat] = useState<{ id: string; type: 'contact' | 'group' } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Get active chat data
  const activeChatData = activeChat ? chats[activeChat.id] : null;
  const activeContact = activeChat?.type === 'contact' 
    ? contacts.find(c => c.id === activeChat.id) 
    : null;
  const activeGroup = activeChat?.type === 'group'
    ? groups.find(g => g.id === activeChat.id)
    : null;

  // Filter contacts and groups
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Authentication handlers
  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setAppState('welcome');
  };

  const handleSignUp = (username: string) => {
    setCurrentUser(username);
    setAppState('welcome');
  };

  const handleWelcomeComplete = () => {
    setAppState('chat');
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    setAppState('login');
    setCurrentUser('');
    setActiveChat(null);
  };

  // Message handler
  const handleSendMessage = (text: string) => {
    if (!activeChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      isOutgoing: true,
    };

    setChats(prev => ({
      ...prev,
      [activeChat.id]: {
        ...prev[activeChat.id],
        messages: [...(prev[activeChat.id]?.messages || []), newMessage]
      }
    }));

    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      const responseText = activeChat.type === 'group' 
        ? 'Thanks for the update! 👍'
        : 'Got it, thanks! 😊';
      
      const responseSender = activeChat.type === 'group'
        ? contacts.find(c => c.id === activeGroup?.memberIds[0])?.name
        : activeContact?.name;

      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        isOutgoing: false,
        sender: responseSender,
        senderId: activeChat.type === 'group' ? activeGroup?.memberIds[0] : activeChat.id,
      };
      
      setChats(prev => ({
        ...prev,
        [activeChat.id]: {
          ...prev[activeChat.id],
          messages: [...(prev[activeChat.id]?.messages || []), response]
        }
      }));
    }, 2000);
  };

  // Contact handler
  const handleAddContact = (username: string) => {
    const newContact: Contact = {
      id: Date.now().toString(),
      name: username,
      status: 'Online',
      isOnline: true,
      unreadCount: 0,
    };
    setContacts([...contacts, newContact]);
    setChats(prev => ({
      ...prev,
      [newContact.id]: {
        id: newContact.id,
        type: 'contact',
        messages: []
      }
    }));
  };

  // Group handler
  const handleCreateGroup = (groupName: string, memberIds: string[]) => {
    const newGroup: Group = {
      id: `g${Date.now()}`,
      name: groupName,
      memberIds,
      memberCount: memberIds.length,
      unreadCount: 0,
    };
    setGroups([...groups, newGroup]);
    setChats(prev => ({
      ...prev,
      [newGroup.id]: {
        id: newGroup.id,
        type: 'group',
        messages: []
      }
    }));
  };

  // Chat selection handler
  const handleSelectChat = (id: string, type: 'contact' | 'group') => {
    setActiveChat({ id, type });
    setIsSidebarOpen(false);
    
    // Clear unread count
    if (type === 'contact') {
      setContacts(prev => prev.map(c => 
        c.id === id ? { ...c, unreadCount: 0 } : c
      ));
    } else {
      setGroups(prev => prev.map(g => 
        g.id === id ? { ...g, unreadCount: 0 } : g
      ));
    }
  };

  // Render based on app state
  if (appState === 'login') {
    return <LoginScreen onLogin={handleLogin} onSignUp={handleSignUp} />;
  }

  if (appState === 'welcome') {
    return <WelcomeTransition username={currentUser} onComplete={handleWelcomeComplete} />;
  }

  return (
    <div className="h-screen flex bg-white">
      {/* Left Sidebar - Contacts & Groups */}
      <div 
        className={`
          ${isSidebarOpen ? 'w-72' : 'w-0'} 
          flex-shrink-0 flex flex-col border-r-2 transition-all duration-300 overflow-hidden
          lg:w-72
        `}
        style={{
          background: 'linear-gradient(180deg, #f0f7ff 0%, #e0efff 100%)',
          borderColor: '#c0d5e8'
        }}
      >
        {/* Sidebar Header */}
        <div 
          className="h-14 px-4 flex items-center justify-between border-b-2"
          style={{
            background: 'linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%)',
            borderColor: '#d0d0d0'
          }}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h1 className="text-sm truncate">MSN Messenger</h1>
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#00ff6a' }} />
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsLogoutModalOpen(true)}
              className="glossy-button w-8 h-8 rounded flex items-center justify-center hover:bg-red-100 transition-colors"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4 text-gray-600" />
            </button>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden glossy-button w-8 h-8 rounded flex items-center justify-center hover:bg-gray-200"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* User Status */}
        <div className="px-4 py-2.5 border-b" style={{ borderColor: '#c0d5e8' }}>
          <p className="text-sm truncate">
            <span className="text-gray-500">Signed in as:</span>{' '}
            <span>{currentUser}</span>
          </p>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              style={{
                borderColor: '#c0c0c0',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
              }}
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto retro-scrollbar">
          {/* Online Users Section */}
          <div className="px-4 py-2 text-xs text-gray-600">
            ONLINE USERS ({filteredContacts.filter(c => c.isOnline).length})
          </div>
          {filteredContacts.map(contact => (
            <ContactListItem
              key={contact.id}
              name={contact.name}
              status={contact.status}
              isOnline={contact.isOnline}
              unreadCount={contact.unreadCount}
              isActive={activeChat?.id === contact.id && activeChat?.type === 'contact'}
              onClick={() => handleSelectChat(contact.id, 'contact')}
            />
          ))}

          {/* Groups Section */}
          <div className="px-4 py-2 text-xs text-gray-600 mt-3 border-t" style={{ borderColor: '#c0d5e8' }}>
            GROUPS ({filteredGroups.length})
          </div>
          {filteredGroups.map(group => (
            <GroupListItem
              key={group.id}
              name={group.name}
              memberCount={group.memberCount}
              lastMessage={group.lastMessage}
              unreadCount={group.unreadCount}
              isActive={activeChat?.id === group.id && activeChat?.type === 'group'}
              onClick={() => handleSelectChat(group.id, 'group')}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="p-3 border-t space-y-2" style={{ borderColor: '#c0d5e8' }}>
          <button
            onClick={() => setIsAddContactModalOpen(true)}
            className="glossy-button w-full py-2.5 rounded flex items-center justify-center gap-2 transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(180deg, #6eb3ff 0%, #2d7dd2 100%)',
              color: 'white'
            }}
          >
            <UserPlus className="w-4 h-4" />
            <span className="text-sm">Add Contact</span>
          </button>
          <button
            onClick={() => setIsCreateGroupModalOpen(true)}
            className="glossy-button w-full py-2.5 rounded flex items-center justify-center gap-2 transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(180deg, #b896ff 0%, #8b5ecf 100%)',
              color: 'white'
            }}
          >
            <UsersIcon className="w-4 h-4" />
            <span className="text-sm">Create Group</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Menu Toggle */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden absolute top-4 left-4 z-10 glossy-button w-10 h-10 rounded flex items-center justify-center"
            style={{
              background: 'linear-gradient(180deg, #6eb3ff 0%, #2d7dd2 100%)',
              color: 'white'
            }}
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {activeChat && (activeContact || activeGroup) ? (
          <>
            {/* Chat Header */}
            <ChatHeader 
              name={activeContact?.name || activeGroup?.name || ''}
              isOnline={activeContact?.isOnline || false}
              isTyping={isTyping}
              isGroup={activeChat.type === 'group'}
              memberCount={activeGroup?.memberCount}
            />

            {/* Messages Area */}
            <div 
              className="flex-1 overflow-y-auto p-4 retro-scrollbar noise-texture"
              style={{ backgroundColor: '#fafafa' }}
            >
              <div className="max-w-4xl mx-auto">
                {activeChatData?.messages.map(message => (
                  <ChatMessage
                    key={message.id}
                    text={message.text}
                    time={message.time}
                    isOutgoing={message.isOutgoing}
                    sender={message.sender}
                    isGroup={activeChat.type === 'group'}
                  />
                ))}
                {isTyping && <TypingIndicator />}
              </div>
            </div>

            {/* Message Input */}
            <MessageInput onSend={handleSendMessage} />
          </>
        ) : (
          // Empty state
          <div className="flex-1 flex items-center justify-center" style={{ background: '#fafafa' }}>
            <div className="text-center">
              <div 
                className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #d9f0ff 0%, #bcefc4 100%)'
                }}
              >
                <UsersIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-lg mb-2">Welcome to MSN Messenger</h2>
              <p className="text-sm text-gray-500">Select a contact or group to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddContactModal 
        isOpen={isAddContactModalOpen}
        onClose={() => setIsAddContactModalOpen(false)}
        onAdd={handleAddContact}
      />
      
      <CreateGroupModal 
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
        onCreate={handleCreateGroup}
        availableContacts={contacts.map(c => ({ id: c.id, name: c.name, isOnline: c.isOnline }))}
      />

      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
}
