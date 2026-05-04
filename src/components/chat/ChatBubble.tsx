import type { ChatMessage } from "../../types/chat";
import ThinkingBubble from "./ThinkingBubble";

interface Props {
  message: ChatMessage;
}

export default function ChatBubble({ message }: Props) {
  const isUser = message.role === "user";
  const isThinking = message.status === "thinking";
  const isError = message.status === "error";

  if (isThinking) return <ThinkingBubble />;

  return (
    <div
      className={`flex items-end gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-500 shrink-0 mb-0.5">
          AI
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[72%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-indigo-500 text-white rounded-tr-sm"
            : isError
              ? "bg-red-50 text-red-600 rounded-tl-sm ring-1 ring-red-100"
              : "bg-white text-zinc-800 rounded-tl-sm shadow-sm ring-1 ring-zinc-100"
        }`}
      >
        {isError && (
          <p className="text-[11px] font-semibold mb-1 opacity-70">⚠ Error</p>
        )}
        <p className="whitespace-pre-wrap">{message.content}</p>
        <p
          className={`text-[10px] mt-1.5 ${
            isUser ? "text-indigo-200 text-right" : "text-zinc-400"
          }`}
        >
          {message.timestamp.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
