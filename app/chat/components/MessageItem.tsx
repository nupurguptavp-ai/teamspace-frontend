'use client';

import { Message } from '../types/message';

const getCurrentUserId = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  } catch {
    return null;
  }
};

export default function MessageItem({ msg }: { msg: Message }) {
  const currentUserId = getCurrentUserId();

  const isMe = msg.sender?.id === currentUserId;

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className="flex gap-3 max-w-md">
        
        {/* Avatar (only for others) */}
        {!isMe && (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm">
            {msg.sender?.email[0].toUpperCase()}
          </div>
        )}

        {/* Message bubble */}
        <div
          className={`
            p-3 rounded-lg
            ${isMe ? 'bg-blue-500 text-white' : 'bg-slate-800 text-white'}
          `}
        >
          {!isMe && (
            <p className="text-sm text-blue-400">
              {msg.sender?.name || msg.sender?.email}
            </p>
          )}

          <p>{msg.content}</p>
        </div>

      </div>
    </div>
  );
}