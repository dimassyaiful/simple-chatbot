import { useCallback, useRef, useEffect } from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import { useChatStore } from "../store/chatStore";
import type { WsIncomingMessage } from "../types/chat";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

const WS_URL = import.meta.env.VITE_WS_URL + "/ws/chat";

export default function ChatPage() {
  const {
    sessionId,
    messages,
    wsStatus,
    setWsStatus,
    addUserMessage,
    addThinkingMessage,
    resetSession,
  } = useChatStore();

  const latestTempIdRef = useRef("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleWsMessage = useCallback((msg: WsIncomingMessage) => {
    if (msg.status === "thinking") return;

    if (msg.status === "done" && msg.id && msg.response !== undefined) {
      useChatStore
        .getState()
        .resolveMessage(latestTempIdRef.current, msg.id, msg.response ?? "");
      return;
    }

    if (msg.status === "error") {
      useChatStore
        .getState()
        .setMessageError(
          latestTempIdRef.current,
          msg.message ?? "Something went wrong.",
        );
    }
  }, []);

  const { send } = useWebSocket(WS_URL, {
    onOpen: () => setWsStatus("open"),
    onClose: () => setWsStatus("closed"),
    onError: () => setWsStatus("error"),
    onMessage: handleWsMessage,
  });

  const handleSend = useCallback(
    (text: string) => {
      const tempId = addUserMessage(text);
      addThinkingMessage(tempId);
      latestTempIdRef.current = tempId;
      send({ sessionId, chat: text });
    },
    [sessionId, addUserMessage, addThinkingMessage, send],
  );

  const statusConfig = {
    connecting: { label: "Connecting", dot: "bg-amber-400" },
    open: { label: "Online", dot: "bg-emerald-400" },
    closed: { label: "Offline", dot: "bg-zinc-300" },
    error: { label: "Error", dot: "bg-red-400" },
  };
  const status = statusConfig[wsStatus];

  return (
    <div className="h-full flex flex-col bg-zinc-50">
      {/* Header */}
      <div className="shrink-0 bg-white border-b border-zinc-100 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-800 leading-none">
              Customer Service AI
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              <span className="text-[11px] text-zinc-400">{status.label}</span>
            </div>
          </div>
        </div>

        {/* New Session — prominent button */}
        <button
          onClick={resetSession}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold transition-colors shadow-sm shadow-indigo-200"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Session
        </button>
      </div>

      {/* Body — scrollable messages + pinned input */}
      <div className="flex-1 min-h-0 flex flex-col max-w-3xl w-full mx-auto">
        {/* Scrollable messages — no scrollbar */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto scrollbar-hide px-4 py-5"
        >
          <ChatWindow messages={messages} />
        </div>

        {/* Input — pinned at bottom */}
        <div className="shrink-0 px-4 pb-4">
          <ChatInput onSend={handleSend} disabled={wsStatus !== "open"} />
        </div>
      </div>
    </div>
  );
}
