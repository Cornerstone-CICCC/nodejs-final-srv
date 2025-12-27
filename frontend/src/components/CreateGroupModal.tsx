import { X } from 'lucide-react';
import { useState } from 'react';

interface Contact {
  id: string;
  name: string;
  isOnline: boolean;
}

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (groupName: string, memberIds: string[]) => void;
  availableContacts: Contact[];
}

export function CreateGroupModal({ isOpen, onClose, onCreate, availableContacts }: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName.trim() && selectedMembers.length > 0) {
      onCreate(groupName, selectedMembers);
      setGroupName('');
      setSelectedMembers([]);
      onClose();
    }
  };

  const toggleMember = (contactId: string) => {
    setSelectedMembers(prev => 
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
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
          width: '420px',
          maxHeight: '560px',
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
          <span>Create New Group</span>
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
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            {/* Group Name */}
            <label className="block mb-2 text-sm">
              Group Name:
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name..."
              className="w-full px-3 py-2 border rounded text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
              style={{
                borderColor: '#c0c0c0',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
              }}
              autoFocus
            />

            {/* Members Selection */}
            <label className="block mb-2 text-sm">
              Add Members:
            </label>
            <div 
              className="border rounded p-2 mb-4 overflow-y-auto retro-scrollbar"
              style={{
                maxHeight: '280px',
                borderColor: '#c0c0c0',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              {availableContacts.map(contact => (
                <label 
                  key={contact.id}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(contact.id)}
                    onChange={() => toggleMember(contact.id)}
                    className="w-4 h-4 cursor-pointer"
                    style={{
                      accentColor: '#2d7dd2'
                    }}
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-sm">{contact.name}</span>
                    {contact.isOnline && (
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: '#00ff6a' }}
                      />
                    )}
                  </div>
                </label>
              ))}
            </div>

            <div className="text-[11px] text-gray-500 mb-4">
              {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
            </div>

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
                disabled={!groupName.trim() || selectedMembers.length === 0}
                className="glossy-button px-5 py-1.5 rounded text-sm transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(180deg, #6eb3ff 0%, #2d7dd2 100%)',
                  color: 'white'
                }}
              >
                Create Group
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
