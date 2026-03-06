"use client";

import { useState, useEffect } from "react";
import { getSocket } from "@/lib/socket-client";

type Question = {
  id: number;
  text: string;
  userName: string;
  answers?: Answer[];
};

type Answer = {
  id: number;
  questionId: number;
  text: string;
  userName: string;
};

type Props = {
  groupId: number;
  userName: string;
  userEmail: string;
};

export default function QuestionBoard({ groupId, userName, userEmail }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState<{ [key: number]: string }>({});
  const [showAnswer, setShowAnswer] = useState<{ [key: number]: boolean }>({});

  const socket = getSocket();

  useEffect(() => {
    socket.emit("join-group", groupId);

    const handleReceiveQuestion = (data: Question) => {
      setQuestions((prev) => [...prev, { ...data, answers: [] }]);
    };

    socket.on("receive-question", handleReceiveQuestion);

    return () => {
      socket.off("receive-question");
    };
  }, [groupId, socket]);

  const sendQuestion = () => {
    if (!questionInput.trim()) return;

    const q: Question = {
      id: Date.now(),
      text: questionInput,
      userName,
      answers: [],
    };

    setQuestions((prev) => [...prev, q]);
    socket.emit("send-question", { ...q, groupId, userEmail });
    setQuestionInput("");
  };

  const sendAnswer = (questionId: number) => {
    const answerText = answerInput[questionId];
    if (!answerText?.trim()) return;

    const answer: Answer = {
      id: Date.now(),
      questionId,
      text: answerText,
      userName,
    };

    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, answers: [...(q.answers || []), answer] }
          : q,
      ),
    );

    setAnswerInput((prev) => ({ ...prev, [questionId]: "" }));
    setShowAnswer((prev) => ({ ...prev, [questionId]: false }));
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col h-96 bg-white shadow-sm">
      <h2 className="font-semibold mb-3 text-lg text-gray-800">
        Questions & Answers
      </h2>
      <div className="flex-1 overflow-y-auto mb-3 space-y-3">
        {questions.map((q) => (
          <div key={q.id} className="border rounded-lg p-3 bg-gray-50">
            <div className="mb-2">
              <span className="font-medium text-green-600">{q.userName}:</span>{" "}
              <span className="text-gray-700">{q.text}</span>
            </div>

            {q.answers?.map((a) => (
              <div
                key={a.id}
                className="ml-4 mt-1 pl-3 border-l-2 border-blue-300"
              >
                <span className="font-medium text-blue-600">
                  Answer ({a.userName}):
                </span>{" "}
                <span className="text-gray-600">{a.text}</span>
              </div>
            ))}

            <div className="mt-2">
              {showAnswer[q.id] ? (
                <div className="flex gap-2">
                  <input
                    className="border rounded px-2 py-1 flex-1 text-sm"
                    value={answerInput[q.id] || ""}
                    onChange={(e) =>
                      setAnswerInput((prev) => ({
                        ...prev,
                        [q.id]: e.target.value,
                      }))
                    }
                    placeholder="Write answer..."
                  />
                  <button
                    onClick={() => sendAnswer(q.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                  >
                    Post
                  </button>
                  <button
                    onClick={() =>
                      setShowAnswer((prev) => ({ ...prev, [q.id]: false }))
                    }
                    className="text-gray-500 text-sm hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    setShowAnswer((prev) => ({ ...prev, [q.id]: true }))
                  }
                  className="text-sm text-blue-600 hover:underline"
                >
                  Answer
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="border rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendQuestion()}
          placeholder="Ask a question..."
        />
        <button
          onClick={sendQuestion}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
