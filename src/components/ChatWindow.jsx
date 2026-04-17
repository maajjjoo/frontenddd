import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

export default function ChatWindow({ messages, isLoading }) {
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-5 py-5">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center gap-4 select-none">
          <div className="w-14 h-14 rounded-2xl bg-white border border-[#e8eaf0] flex items-center justify-center shadow-sm">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">Start a conversation</p>
            <p className="text-xs text-gray-400 mt-1">Type a prompt below to get a response</p>
          </div>
        </div>
      )}
      {messages.map(msg => <ChatMessage key={msg.id} {...msg} />)}
      {isLoading && (
        <div className="flex justify-start mb-4">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold mr-2.5 mt-0.5 shadow-sm">AI</div>
          <div className="bg-white border border-[#e8eaf0] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
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
