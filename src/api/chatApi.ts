import api from "./axios";
import type { ChatHistoryItem } from "../types/chat";

export const chatApi = {
  getHistory: (sessionId: string) =>
    api.get<ChatHistoryItem[]>(`/api/chats/${sessionId}`).then((r) => r.data),
};
