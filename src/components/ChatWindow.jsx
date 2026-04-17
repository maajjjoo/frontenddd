import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

export default function ChatWindow({ messages, isLoading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-1">
      {messages.length === 0 && (
        <div className="text-center text-gray-400 text-sm mt-10">
          Send a prompt to get started
        </div>
      )}
      {messages.map(msg => (
        <ChatMessage key={msg.id} role={msg.role} text={msg.text} timestamp={msg.timestamp} />
      ))}
      {isLoading && (
        <div className="flex justify-start mb-3">
          <div className="bg-gray-100 rounded-2xl px-4 py-3">
            <div className="flex space-x-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
