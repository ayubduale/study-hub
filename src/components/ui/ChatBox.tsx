"use client";

import { useState, useEffect, useRef } from "react";
import { getSocket } from "@/lib/socket-client";

type ChatMessage = {
  id: number;
  text: string;
  userName: string;
  timestamp?: Date;
};

type Props = {
  groupId: number;
  userName: string;
  userEmail: string;
};

export default function ChatBox({ groupId, userName, userEmail }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const socket = getSocket();

  useEffect(() => {
    socket.emit("join-group", groupId);

    const handleReceiveChat = (data: ChatMessage) => {
      setMessages((prev) => [...prev, { ...data, timestamp: new Date() }]);
    };

    socket.on("receive-chat", handleReceiveChat);

    return () => {
      socket.off("receive-chat", handleReceiveChat);
    };
  }, [groupId, socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const msg: ChatMessage = {
      id: Date.now(),
      text: input,
      userName,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, msg]);
    socket.emit("send-chat", { ...msg, groupId, userEmail });
    setInput("");
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col h-96 bg-white shadow-sm">
      <h2 className="font-semibold mb-3 text-lg text-gray-800">Group Chat</h2>
      <div className="flex-1 overflow-y-auto mb-3 space-y-2 bg-gray-50 p-3 rounded-lg">
        {messages.map((m, idx) => (
          <div
            key={`${m.id}-${idx}`}
            className={`text-sm p-2 rounded-lg ${
              m.userName === userName
                ? "bg-blue-100 ml-auto text-right"
                : "bg-white border"
            } max-w-[80%]`}
          >
            <span className="font-medium text-blue-600">{m.userName}:</span>{" "}
            <span className="text-gray-700">{m.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          className="border rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
