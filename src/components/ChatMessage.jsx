export default function ChatMessage({ role, text, timestamp }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
        <p>{text}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-400'}`}>
          {new Date(timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
