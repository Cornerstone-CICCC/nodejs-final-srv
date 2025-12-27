interface ChatMessageProps {
  text: string;
  time: string;
  isOutgoing: boolean;
  sender?: string;
  isGroup?: boolean;
}

export function ChatMessage({ text, time, isOutgoing, sender, isGroup }: ChatMessageProps) {
  return (
    <div className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[70%] ${isOutgoing ? 'items-end' : 'items-start'} flex flex-col`}>
        {!isOutgoing && isGroup && sender && (
          <span className="text-[11px] text-gray-500 mb-1 px-1">{sender}</span>
        )}
        <div 
          className={`
            chat-bubble px-4 py-2.5 rounded-lg
            ${isOutgoing 
              ? 'rounded-br-sm' 
              : 'rounded-bl-sm'
            }
          `}
          style={{
            backgroundColor: isOutgoing ? '#bcefc4' : '#efefef'
          }}
        >
          <p className="text-[13px] leading-relaxed">{text}</p>
        </div>
        <span className="text-[10px] text-gray-400 mt-1 px-1 font-mono">{time}</span>
      </div>
    </div>
  );
}