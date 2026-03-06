"use client";
import { useState, useEffect } from "react";
import { getSocket } from "@/lib/socket-client";

type Question = { id: number; text: string; userName: string };
type Answer = {
  id: number;
  questionId: number;
  text: string;
  userName: string;
};

type Props = { groupId: number; userName: string };

export default function QuestionBoard({ groupId, userName }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionInput, setQuestionInput] = useState("");
  const socket = getSocket();

  useEffect(() => {
    socket.emit("join-group", groupId);
    socket.on("receive-question", (data: Question) =>
      setQuestions((prev) => [...prev, data]),
    );
    return () => socket.off("receive-question");
  }, [groupId, socket]);

  const sendQuestion = () => {
    if (!questionInput.trim()) return;
    const q: Question = { id: Date.now(), text: questionInput, userName };
    setQuestions((prev) => [...prev, q]);
    socket.emit("send-question", { ...q, groupId });
    setQuestionInput("");
  };

  return (
    <div className="border rounded p-4 flex flex-col h-80">
      <h2 className="font-semibold mb-2">Questions</h2>
      <div className="flex-1 overflow-y-auto mb-2 space-y-2">
        {questions.map((q) => (
          <div key={q.id} className="border p-2 rounded">
            <span className="font-medium">{q.userName}:</span> {q.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="border rounded px-2 py-1 flex-1"
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
          placeholder="Ask a question..."
        />
        <button
          onClick={sendQuestion}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
