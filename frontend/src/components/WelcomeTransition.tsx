import { useEffect, useState } from 'react';
import { User } from 'lucide-react';

interface WelcomeTransitionProps {
  username: string;
  onComplete: () => void;
}

export function WelcomeTransition({ username, onComplete }: WelcomeTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in
    setTimeout(() => setIsVisible(true), 100);
    
    // Auto complete after 2 seconds
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2000);
  }, [onComplete]);

  return (
    <div 
      className={`
        fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      style={{
        background: 'linear-gradient(135deg, #d9f0ff 0%, #bcefc4 100%)'
      }}
    >
      <div className="text-center">
        {/* Avatar with pulse */}
        <div className="flex justify-center mb-4">
          <div 
            className={`
              w-24 h-24 rounded-full flex items-center justify-center
              transition-transform duration-700
              ${isVisible ? 'scale-100' : 'scale-50'}
            `}
            style={{
              background: 'linear-gradient(135deg, #6eb3ff 0%, #2d7dd2 100%)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)'
            }}
          >
            <User className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Welcome message */}
        <h1 
          className={`
            text-2xl mb-2 transition-all duration-700 delay-300
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          Welcome, {username}!
        </h1>
        
        <p 
          className={`
            text-sm text-gray-600 transition-all duration-700 delay-500
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          Connecting you to MSN Messenger...
        </p>

        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full animate-bounce"
              style={{
                backgroundColor: '#00ff6a',
                animationDelay: `${i * 200}ms`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
