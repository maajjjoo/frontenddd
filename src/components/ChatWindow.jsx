import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

export default function ChatWindow({ messages, isLoading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center gap-3 opacity-40">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl">
            ✨
          </div>
          <p className="text-gray-400 text-sm">Ask anything to get started</p>
        </div>
      )}
      {messages.map(msg => (
        <ChatMessage key={msg.id} role={msg.role} text={msg.text} timestamp={msg.timestamp} />
      ))}
      {isLoading && (
        <div className="flex justify-start mb-4">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs mr-2 mt-1">
            AI
          </div>
          <div className="glass rounded-2xl rounded-tl-sm px-4 py-3">
            <div className="flex space-x-1.5 items-center h-4">
              <span className="w-2 h-2 rounded-full bg-indigo-400 dot-1" />
              <span className="w-2 h-2 rounded-full bg-indigo-400 dot-2" />
              <span className="w-2 h-2 rounded-full bg-indigo-400 dot-3" />
            </div>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
