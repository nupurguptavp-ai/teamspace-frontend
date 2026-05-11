"use client";

import { useRef, useState } from "react";
import { Paperclip, Send } from "lucide-react";
import axios from "axios";

export default function MessageInput({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  // 🔥 handle file click
  const handleAttachClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const formData = new FormData();

    formData.append("file", file); // ✅ REAL FILE
    formData.append("uploaderId", userId || ""); // ✅ REQUIRED
    formData.append("messageId", crypto.randomUUID()); // ✅ VALID UUID

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/files/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // ❌ DO NOT ADD content-type
          },
        }
      );

      console.log("UPLOAD SUCCESS");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex items-center gap-2 bg-slate-800 p-3 rounded-xl">
      {/* 📎 Attach */}
      <button onClick={handleAttachClick}>
        <Paperclip className="text-gray-400 hover:text-white" />
      </button>

      {/* hidden file input */}
      <input
        type="file"
        ref={fileRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Input */}
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        className="flex-1 bg-transparent outline-none text-white"
      />

      {/* Send */}
      <button onClick={handleSend}>
        <Send className="text-blue-400 hover:text-blue-300" />
      </button>
    </div>
  );
}
