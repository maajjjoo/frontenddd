import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

export default function ChatWindow({ messages, isLoading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-5 py-6">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center gap-4 opacity-70">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-pastel-pink to-pastel-lavender flex items-center justify-center text-3xl soft-shadow">
            🌸
          </div>
          <div>
            <p className="text-soft-text font-medium text-sm">Welcome to AI Platform</p>
            <p className="text-soft-muted text-xs mt-1">Type a prompt below to get started</p>
          </div>
        </div>
      )}
      {messages.map(msg => (
        <ChatMessage key={msg.id} role={msg.role} text={msg.text} timestamp={msg.timestamp} />
      ))}
      {isLoading && (
        <div className="flex justify-start mb-4">
          <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-pastel-rose to-pastel-lavender flex items-center justify-center text-xs mr-2 mt-1 soft-shadow">
            ✨
          </div>
          <div className="bg-white border border-pastel-pink/60 rounded-2xl rounded-tl-sm px-4 py-3 soft-shadow">
            <div className="flex space-x-1.5 items-center h-4">
              <span className="w-2 h-2 rounded-full bg-pink-300 dot-1" />
              <span className="w-2 h-2 rounded-full bg-pink-300 dot-2" />
              <span className="w-2 h-2 rounded-full bg-pink-300 dot-3" />
            </div>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
