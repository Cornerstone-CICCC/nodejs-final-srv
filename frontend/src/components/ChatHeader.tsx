import { User, Phone, Video, MoreVertical, Users } from 'lucide-react';

interface ChatHeaderProps {
  name: string;
  isOnline: boolean;
  isTyping?: boolean;
  isGroup?: boolean;
  memberCount?: number;
}

export function ChatHeader({ name, isOnline, isTyping, isGroup, memberCount }: ChatHeaderProps) {
  return (
    <div 
      className="h-14 px-4 flex items-center justify-between border-b-2"
      style={{
        background: 'linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%)',
        borderColor: '#d0d0d0',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
      }}
    >
      {/* User info */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className={`w-8 h-8 rounded-sm ${isGroup ? 'bg-gradient-to-br from-purple-300 to-purple-400' : 'bg-gradient-to-br from-blue-300 to-blue-400'} flex items-center justify-center shadow-sm`}>
            {isGroup ? (
              <Users className="w-4 h-4 text-white" />
            ) : (
              <User className="w-4 h-4 text-white" />
            )}
          </div>
          {!isGroup && isOnline && (
            <div 
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white"
              style={{ backgroundColor: '#00ff6a' }}
            />
          )}
        </div>
        <div>
          <h2 className="text-sm">{name}</h2>
          {isTyping ? (
            <p className="text-[11px]" style={{ color: '#00ff6a' }}>typing...</p>
          ) : (
            <p className="text-[11px] text-gray-500">
              {isGroup ? `${memberCount} members` : (isOnline ? 'Online' : 'Offline')}
            </p>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <button 
          className="glossy-button w-8 h-8 rounded flex items-center justify-center hover:bg-gray-200 transition-colors"
          aria-label="Voice call"
        >
          <Phone className="w-4 h-4 text-gray-600" />
        </button>
        <button 
          className="glossy-button w-8 h-8 rounded flex items-center justify-center hover:bg-gray-200 transition-colors"
          aria-label="Video call"
        >
          <Video className="w-4 h-4 text-gray-600" />
        </button>
        <button 
          className="glossy-button w-8 h-8 rounded flex items-center justify-center hover:bg-gray-200 transition-colors"
          aria-label="More options"
        >
          <MoreVertical className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}