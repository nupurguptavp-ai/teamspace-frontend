'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';

type Message = {
  id: string;
  content: string;
  sender: {
    email: string;
    name?: string;
  };
};

export function useChatSocket(channelId: string | null) {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!channelId) return; // ✅ IMPORTANT

    const token = localStorage.getItem('token');

    // ✅ 1. Fetch old messages
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/messages/channel/${channelId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessages(res.data.reverse());
      } catch (err) {
        console.error('Failed to load messages');
      }
    };

    fetchMessages();

    // ✅ 2. Socket
    const socketInstance = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
      auth: { token },
    });

    socketRef.current = socketInstance;

    socketInstance.emit('joinChannel', { channelId });

    socketInstance.on('receiveMessage', (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [channelId]);

  const sendMessage = (content: string) => {
    socketRef.current?.emit('sendMessage', {
      channelId,
      content,
    });
  };

  return { messages, sendMessage };
}