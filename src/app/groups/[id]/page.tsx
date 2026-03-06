"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import ChatBox from "@/components/ui/ChatBox";
import QuestionBoard from "@/components/ui/QuestionBoard";

export default function GroupPage() {
  const params = useParams();
  const groupId = parseInt(params.id as string);
  const { user, isLoaded } = useUser();

  const [groupName, setGroupName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      window.location.href = "/";
      return;
    }

    // Fetch group details
    const fetchGroup = async () => {
      try {
        const res = await fetch(`/api/groups?id=${groupId}`);

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
  }, [groupId, user, isLoaded]);

  if (!isLoaded || isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading group...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  const userName =
    user.fullName || user.emailAddresses[0]?.emailAddress || "User";
  const userEmail = user.emailAddresses[0]?.emailAddress || "";

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
