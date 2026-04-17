import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

export default function ChatWindow({ messages, isLoading }) {
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-5 py-5">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center gap-3 opacity-50">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Start a conversation</p>
            <p className="text-xs text-gray-400 mt-0.5">Type a prompt below to get started</p>
          </div>
        </div>
      )}
      {messages.map(msg => <ChatMessage key={msg.id} {...msg} />)}
      {isLoading && (
        <div className="flex justify-start mb-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold mr-2 mt-1">AI</div>
          <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
            <div className="flex space-x-1.5 items-center h-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 dot-1" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 dot-2" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 dot-3" />
            </div>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
