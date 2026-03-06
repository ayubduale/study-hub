"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ChatBox from "@/components/ui/ChatBox";
import QuestionBoard from "@/components/ui/QuestionBoard";

export default function GroupPage() {
  const params = useParams();
  const groupId = parseInt(params.id as string);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [groupName, setGroupName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user info from localStorage
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");

    if (!token || !name) {
      window.location.href = "/";
      return;
    }

    setUserName(name);

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserEmail(payload.email);
    } catch (error) {
      console.error("Invalid token");
    }

    // Fetch group details
    const fetchGroup = async () => {
      try {
        const res = await fetch(`/api/groups?id=${groupId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setGroupName(data.name);
        }
      } catch (error) {
        console.error("Failed to fetch group");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroup();
  }, [groupId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading group...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{groupName}</h1>
        <p className="text-gray-600">Welcome, {userName}!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChatBox groupId={groupId} userName={userName} userEmail={userEmail} />
        <QuestionBoard
          groupId={groupId}
          userName={userName}
          userEmail={userEmail}
        />
      </div>
    </div>
  );
}
