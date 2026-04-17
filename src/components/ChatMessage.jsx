export default function ChatMessage({ role, text, timestamp }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold mr-2 mt-1 flex-shrink-0">
          AI
        </div>
      )}
      <div className={`max-w-[72%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-indigo-600 text-white rounded-tr-sm'
            : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm'
        }`}>
          {text}
        </div>
        <span className="text-[10px] text-gray-400 mt-1 px-1">
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      {isUser && (
        <div className="w-7 h-7 rounded-lg bg-gray-200 flex items-center justify-center text-[10px] text-gray-600 font-bold ml-2 mt-1 flex-shrink-0">
          U
        </div>
      )}
    </div>
  );
}
