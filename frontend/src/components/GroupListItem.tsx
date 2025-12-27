import { Users } from 'lucide-react';

interface GroupListItemProps {
  name: string;
  memberCount: number;
  lastMessage?: string;
  unreadCount?: number;
  isActive: boolean;
  onClick: () => void;
}

export function GroupListItem({ 
  name, 
  memberCount,
  lastMessage,
  unreadCount = 0, 
  isActive,
  onClick 
}: GroupListItemProps) {
  return (
    <div 
      onClick={onClick}
      className={`
        flex items-center gap-3 px-3 py-2.5 cursor-pointer
        transition-all duration-150
        ${isActive ? 'bg-[#c7e7ff]' : 'hover:bg-[#c7e7ff]'}
      `}
    >
      {/* Group Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-purple-300 to-purple-400 flex items-center justify-center shadow-sm">
          <Users className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Name and info */}
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
        <p className="text-[11px] text-gray-500 truncate mt-0.5">
          {lastMessage || `${memberCount} members`}
        </p>
      </div>
    </div>
  );
}
