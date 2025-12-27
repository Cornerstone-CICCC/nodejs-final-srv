import { useState } from 'react';
import { Send, Smile } from 'lucide-react';

interface MessageInputProps {
  onSend: (message: string) => void;
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div 
      className="h-16 px-4 flex items-center gap-2 border-t-2"
      style={{
        background: 'linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%)',
        borderColor: '#d0d0d0',
        boxShadow: '0 -1px 2px rgba(0,0,0,0.05)'
      }}
    >
      <button 
        className="glossy-button w-9 h-9 rounded flex items-center justify-center transition-all hover:scale-105"
        style={{
          background: 'linear-gradient(180deg, #fff4d0 0%, #ffe680 100%)',
        }}
        aria-label="Emoji"
      >
        <Smile className="w-4 h-4 text-gray-600" />
      </button>

      <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          style={{
            borderColor: '#c0c0c0',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
          }}
        />
        
        <button
          type="submit"
          className="glossy-button px-5 py-2 rounded transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(180deg, #6eb3ff 0%, #2d7dd2 100%)',
            color: 'white'
          }}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
