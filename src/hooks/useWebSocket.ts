import { useEffect, useRef, useCallback } from "react";
import type { WsIncomingMessage } from "../types/chat";

interface Options {
  onMessage: (msg: WsIncomingMessage) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: () => void;
}

export function useWebSocket(url: string, options: Options) {
  const wsRef = useRef<WebSocket | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => optionsRef.current.onOpen?.();

    ws.onmessage = (event) => {
      try {
        const data: WsIncomingMessage = JSON.parse(event.data);
        optionsRef.current.onMessage(data);
      } catch {
        console.error("Failed to parse WS message:", event.data);
      }
    };

    ws.onclose = () => optionsRef.current.onClose?.();
    ws.onerror = () => optionsRef.current.onError?.();

    return () => {
      ws.close();
    };
  }, [url]);

  const send = useCallback((payload: object) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
    }
  }, []);

  return { send };
}
