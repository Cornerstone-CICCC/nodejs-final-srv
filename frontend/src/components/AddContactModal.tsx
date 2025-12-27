import { X } from 'lucide-react';
import { useState } from 'react';

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (username: string) => void;
}

export function AddContactModal({ isOpen, onClose, onAdd }: AddContactModalProps) {
  const [username, setUsername] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onAdd(username);
      setUsername('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      {/* Modal - Windows 98 style dialog */}
      <div 
        className="relative bg-white rounded shadow-xl"
        style={{
          width: '380px',
          border: '2px solid #0054a6',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
      >
        {/* Title bar */}
        <div 
          className="h-7 px-2 flex items-center justify-between rounded-t text-white text-sm"
          style={{
            background: 'linear-gradient(180deg, #0997ff 0%, #0054a6 100%)'
          }}
        >
          <span>Add New Contact</span>
          <button 
            onClick={onClose}
            className="w-5 h-5 flex items-center justify-center hover:bg-red-500 transition-colors rounded-sm"
            style={{
              background: 'linear-gradient(180deg, #e0e0e0 0%, #b0b0b0 100%)',
              color: '#2a2a2a',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)'
            }}
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm">
              Enter username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username@messenger.com"
              className="w-full px-3 py-2 border rounded text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-blue-300"
              style={{
                borderColor: '#c0c0c0',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
              }}
              autoFocus
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="glossy-button px-5 py-1.5 rounded text-sm transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(180deg, #f0f0f0 0%, #d0d0d0 100%)'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="glossy-button px-5 py-1.5 rounded text-sm transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(180deg, #6eb3ff 0%, #2d7dd2 100%)',
                  color: 'white'
                }}
              >
                Add Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
