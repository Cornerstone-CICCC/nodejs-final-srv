import { User } from 'lucide-react';

interface ContactListItemProps {
  name: string;
  status: string;
  isOnline: boolean;
  unreadCount?: number;
  isActive: boolean;
  onClick: () => void;
}

export function ContactListItem({ 
  name, 
  status, 
  isOnline, 
  unreadCount = 0, 
  isActive,
  onClick 
}: ContactListItemProps) {
  return (
    <div 
      onClick={onClick}
      className={`
        flex items-center gap-3 px-3 py-2.5 cursor-pointer
        transition-all duration-150
        ${isActive ? 'bg-[#c7e7ff]' : 'hover:bg-[#c7e7ff]'}
      `}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center shadow-sm">
          <User className="w-5 h-5 text-white" />
        </div>
        {/* Online indicator */}
        {isOnline && (
          <div 
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: '#00ff6a' }}
          />
        )}
      </div>

      {/* Name and status */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-sm truncate">{name}</span>
          {unreadCount > 0 && (
            <span 
              className="flex-shrink-0 w-5 h-5 rounded-full text-white text-[10px] flex items-center justify-center shadow-sm"
              style={{ 
                background: 'linear-gradient(180deg, #ff4444 0%, #cc0000 100%)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)'
              }}
            >
              {unreadCount}
            </span>
          )}
        </div>
        <p className="text-[11px] text-gray-500 truncate mt-0.5">{status}</p>
      </div>
    </div>
  );
}
