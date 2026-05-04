import type { ChatMessage } from "../../types/chat";
import ChatBubble from "./ChatBubble";

interface Props {
  messages: ChatMessage[];
}

export default function ChatWindow({ messages }: Props) {
  if (messages.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-3 text-zinc-400 select-none">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-indigo-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-zinc-500">
            Start a conversation
          </p>
          <p className="text-xs text-zinc-400 mt-0.5">
            Type a message and press Enter
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <ChatBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}
