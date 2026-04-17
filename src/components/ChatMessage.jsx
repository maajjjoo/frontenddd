export default function ChatMessage({ role, text, timestamp }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold mr-2.5 mt-0.5 flex-shrink-0 shadow-sm">
          AI
        </div>
      )}
      <div className={`max-w-[70%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isUser
            ? 'bg-indigo-600 text-white rounded-tr-sm'
            : 'bg-white border border-[#e8eaf0] text-gray-800 rounded-tl-sm'
        }`}>
          {text}
        </div>
        <span className="text-[10px] text-gray-400 mt-1.5 px-1">
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-gray-200 flex items-center justify-center text-[10px] text-gray-500 font-bold ml-2.5 mt-0.5 flex-shrink-0">
          U
        </div>
      )}
    </div>
  );
}
