import { useState } from 'react';
import { User, Lock } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (username: string, password: string) => void;
  onSignUp: (username: string, password: string) => void;
}

export function LoginScreen({ onLogin, onSignUp }: LoginScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      setIsLoading(true);
      
      // Simulate loading delay for retro effect
      setTimeout(() => {
        if (isLogin) {
          onLogin(username, password);
        } else {
          onSignUp(username, password);
        }
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #d9f0ff 0%, #bcefc4 100%)'
      }}
    >
      {/* Login Dialog - Windows 98 style */}
      <div 
        className="relative bg-white rounded shadow-xl w-full max-w-md"
        style={{
          border: '2px solid #0054a6',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
        }}
      >
        {/* Title bar */}
        <div 
          className="h-8 px-3 flex items-center rounded-t text-white"
          style={{
            background: 'linear-gradient(180deg, #0997ff 0%, #0054a6 100%)'
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white/20 rounded-sm" />
            <span className="text-sm">MSN Messenger - {isLogin ? 'Login' : 'Sign Up'}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Logo/Mascot Area */}
          <div className="flex flex-col items-center mb-6">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mb-3"
              style={{
                background: 'linear-gradient(135deg, #6eb3ff 0%, #2d7dd2 100%)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.3)'
              }}
            >
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-xl mb-1">Welcome to MSN Messenger</h1>
            <p className="text-sm text-gray-500">Connect with friends instantly</p>
          </div>

          {/* Tab Toggle */}
          <div className="flex gap-2 mb-5">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`
                flex-1 py-2 rounded text-sm transition-all
                ${isLogin ? 'glossy-button' : 'hover:bg-gray-100'}
              `}
              style={isLogin ? {
                background: 'linear-gradient(180deg, #6eb3ff 0%, #2d7dd2 100%)',
                color: 'white'
              } : {}}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`
                flex-1 py-2 rounded text-sm transition-all
                ${!isLogin ? 'glossy-button' : 'hover:bg-gray-100'}
              `}
              style={!isLogin ? {
                background: 'linear-gradient(180deg, #6eb3ff 0%, #2d7dd2 100%)',
                color: 'white'
              } : {}}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <label className="block mb-4">
              <span className="text-sm mb-1.5 block">Username:</span>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full pl-10 pr-3 py-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  style={{
                    borderColor: '#c0c0c0',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
                  }}
                  disabled={isLoading}
                />
              </div>
            </label>

            {/* Password */}
            <label className="block mb-5">
              <span className="text-sm mb-1.5 block">Password:</span>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-3 py-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  style={{
                    borderColor: '#c0c0c0',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
                  }}
                  disabled={isLoading}
                />
              </div>
            </label>

            {/* Loading Bar */}
            {isLoading && (
              <div className="mb-4">
                <div 
                  className="h-5 border rounded overflow-hidden"
                  style={{
                    borderColor: '#c0c0c0',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  <div 
                    className="h-full animate-pulse"
                    style={{
                      background: 'linear-gradient(90deg, #00ff6a 0%, #00cc55 100%)',
                      animation: 'loading 1.5s ease-in-out infinite'
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1.5 text-center">
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !username.trim() || !password.trim()}
              className="glossy-button w-full py-2.5 rounded transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                background: 'linear-gradient(180deg, #6eb3ff 0%, #2d7dd2 100%)',
                color: 'white'
              }}
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>

            {/* Forgot Password Link */}
            {isLogin && (
              <button
                type="button"
                className="w-full text-center text-xs text-blue-600 hover:underline mt-3"
              >
                Forgot password?
              </button>
            )}
          </form>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0%, 100% { width: 30%; margin-left: 0; }
          50% { width: 70%; margin-left: 30%; }
        }
      `}</style>
    </div>
  );
}
