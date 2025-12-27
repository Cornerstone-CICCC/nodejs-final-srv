export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div 
        className="chat-bubble px-4 py-3 rounded-lg rounded-bl-sm"
        style={{ backgroundColor: '#efefef' }}
      >
        <div className="flex gap-1.5">
          <div 
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ 
              backgroundColor: '#00ff6a',
              animationDelay: '0ms',
              animationDuration: '1.4s'
            }}
          />
          <div 
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ 
              backgroundColor: '#00ff6a',
              animationDelay: '200ms',
              animationDuration: '1.4s'
            }}
          />
          <div 
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ 
              backgroundColor: '#00ff6a',
              animationDelay: '400ms',
              animationDuration: '1.4s'
            }}
          />
        </div>
      </div>
    </div>
  );
}
