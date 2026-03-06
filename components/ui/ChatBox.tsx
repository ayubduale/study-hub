"use client";
import { useState, useEffect } from "react";
import { getSocket } from "@/lib/socket-client";

type ChatMessage = { id: number; text: string; userName: string };

type Props = { groupId: number; userName: string };

export default function ChatBox({ groupId, userName }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const socket = getSocket();

  useEffect(() => {
    socket.emit("join-group", groupId);
    const handleReceiveChat = (data: ChatMessage) =>
      setMessages((prev) => [...prev, data]);
    socket.on("receive-chat", handleReceiveChat);
    return () => socket.off("receive-chat", handleReceiveChat);
  }, [groupId, socket]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const msg: ChatMessage = { id: Date.now(), text: input, userName };
    setMessages((prev) => [...prev, msg]);
    socket.emit("send-chat", { ...msg, groupId });
    setInput("");
  };

  return (
    <div className="border rounded p-4 flex flex-col h-80">
      <h2 className="font-semibold mb-2">Chat</h2>
      <div className="flex-1 overflow-y-auto mb-2 space-y-1">
        {messages.map((m) => (
          <div key={m.id} className="text-sm">
            <span className="font-medium">{m.userName}:</span> {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="border rounded px-2 py-1 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
