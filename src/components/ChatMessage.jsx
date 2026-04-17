export default function ChatMessage({ role, text, timestamp }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-pastel-rose to-pastel-lavender flex items-center justify-center text-xs mr-2 mt-1 flex-shrink-0 soft-shadow">
          ✨
        </div>
      )}
      <div className={`max-w-[72%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-gradient-to-br from-pink-400 to-rose-400 text-white rounded-tr-sm soft-shadow'
            : 'bg-white border border-pastel-pink/60 text-soft-text rounded-tl-sm soft-shadow'
        }`}>
          {text}
        </div>
        <span className="text-xs text-soft-muted mt-1 px-1">
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-pink-300 to-rose-300 flex items-center justify-center text-xs ml-2 mt-1 flex-shrink-0 text-white font-semibold soft-shadow">
          U
        </div>
      )}
    </div>
  );
}
