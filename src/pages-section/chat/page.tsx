"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to /login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const prompt = input;
    setInput("");
    setStreaming(true);

    setMessages([{ role: "user", content: prompt }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const responseText: string = data.response;

      let index = 0;
      let botMessage = "";

      const streamInterval = setInterval(() => {
        botMessage += responseText.charAt(index);
        index++;

        setMessages([
          { role: "user", content: prompt },
          { role: "assistant", content: botMessage },
        ]);

        if (index >= responseText.length) {
          clearInterval(streamInterval);
          setStreaming(false);
        }
      }, 15);
    } catch (error) {
      console.log("Error fetching response:", error);
      setMessages([
        { role: "user", content: prompt },
        { role: "assistant", content: "❌ Failed to fetch response" },
      ]);
      setStreaming(false);
    }
  };


  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 mt-20">
      <h1 className="text-2xl font-bold text-center mb-6">Gemini Chat</h1>

      {session?.user && (
        <div className="text-right mb-4 text-sm text-gray-500">
          Logged in as <strong>{session.user.name || session.user.email}</strong>
        </div>
      )}

      <div className="space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-[85%] ${
              msg.role === "user"
                ? "ml-auto bg-blue-100 text-right"
                : "mr-auto bg-gray-100 text-left"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap text-gray-800">{msg.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded shadow-sm"
          placeholder="Ask something..."
          disabled={streaming}
        />
        <button
          onClick={handleSend}
          disabled={streaming}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {streaming ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}