"use client";

import { ReactNode, useEffect } from "react";
import { getSocket } from "@/lib/socket-client";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize socket connection
    const socket = getSocket();

    return () => {
      socket.disconnect();
    };
  }, []);

  return <>{children}</>;
}
