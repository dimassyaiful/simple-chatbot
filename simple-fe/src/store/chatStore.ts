import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { ChatMessage } from "../types/chat";

interface ChatStore {
  sessionId: string;
  resetSession: () => void;

  wsStatus: "connecting" | "open" | "closed" | "error";
  setWsStatus: (s: ChatStore["wsStatus"]) => void;

  messages: ChatMessage[];
  addUserMessage: (content: string) => string;
  addThinkingMessage: (tempId: string) => void;
  resolveMessage: (tempId: string, dbId: string, content: string) => void;
  setMessageError: (tempId: string, errorMsg: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  sessionId: uuidv4(),
  resetSession: () => set({ sessionId: uuidv4(), messages: [] }),

  wsStatus: "connecting",
  setWsStatus: (wsStatus) => set({ wsStatus }),

  messages: [],

  addUserMessage: (content) => {
    const id = crypto.randomUUID();
    set((s) => ({
      messages: [
        ...s.messages,
        {
          id,
          sessionId: s.sessionId,
          role: "user",
          content,
          status: "done",
          timestamp: new Date(),
        },
      ],
    }));
    return id;
  },

  addThinkingMessage: (tempId) => {
    set((s) => ({
      messages: [
        ...s.messages,
        {
          id: tempId + "-ai",
          sessionId: s.sessionId,
          role: "assistant",
          content: "",
          status: "thinking",
          timestamp: new Date(),
        },
      ],
    }));
  },

  resolveMessage: (tempId, dbId, content) => {
    set((s) => ({
      messages: s.messages.map((m) =>
        m.id === tempId + "-ai"
          ? { ...m, dbId, content, status: "done", timestamp: new Date() }
          : m,
      ),
    }));
  },

  setMessageError: (tempId, errorMsg) => {
    set((s) => ({
      messages: s.messages.map((m) =>
        m.id === tempId + "-ai"
          ? { ...m, content: errorMsg, status: "error", timestamp: new Date() }
          : m,
      ),
    }));
  },
}));
