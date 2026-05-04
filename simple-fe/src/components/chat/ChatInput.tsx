import { useState, useRef } from "react";

interface Props {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <div className="flex items-end gap-2 bg-white rounded-2xl ring-1 ring-zinc-200 px-3 py-2 focus-within:ring-indigo-400 focus-within:ring-2 transition-shadow">
      <textarea
        ref={textareaRef}
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        disabled={disabled}
        placeholder={
          disabled
            ? "Connecting..."
            : "Type a message... (Shift+Enter for new line)"
        }
        className="flex-1 resize-none bg-transparent text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none disabled:opacity-40 max-h-32 leading-relaxed py-1.5"
      />
      <button
        onClick={handleSend}
        disabled={!text.trim() || disabled}
        className="h-8 w-8 rounded-xl bg-indigo-500 text-white flex items-center justify-center hover:bg-indigo-600 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0 mb-0.5"
        aria-label="Send"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </button>
    </div>
  );
}
