import { AlertCircle, X } from 'lucide-react';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function LogoutConfirmModal({ isOpen, onConfirm, onCancel }: LogoutConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30"
        onClick={onCancel}
      />

      {/* Modal - Windows 98 style dialog */}
      <div 
        className="relative bg-white rounded shadow-xl"
        style={{
          width: '360px',
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
          <span>Confirm Logout</span>
          <button 
            onClick={onCancel}
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
          <div className="flex gap-4 mb-5">
            <div 
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #ffaa00 100%)'
              }}
            >
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm leading-relaxed">
                Are you sure you want to log out of MSN Messenger?
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              onClick={onCancel}
              className="glossy-button px-5 py-1.5 rounded text-sm transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(180deg, #f0f0f0 0%, #d0d0d0 100%)'
              }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="glossy-button px-5 py-1.5 rounded text-sm transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(180deg, #6eb3ff 0%, #2d7dd2 100%)',
                color: 'white'
              }}
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
