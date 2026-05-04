// Sent TO the WebSocket server
export interface WsOutgoingMessage {
  sessionId: string;
  chat: string;
}

// Received FROM the WebSocket server
export interface WsIncomingMessage {
  id?: string;
  sessionId?: string;
  status: "thinking" | "done" | "error";
  response?: string;
  message?: string;
  timestamp?: string;
}

// Combined for UI rendering
export interface ChatMessage {
  id: string;
  dbId?: string;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  status: "thinking" | "done" | "error";
  timestamp: Date;
}

// From GET /api/chats/{sessionId}
export interface ChatHistoryItem {
  id: string;
  sessionId: string;
  userMessage: string;
  aiResponse: string | null;
  status: string;
  createdAt: string;
}
