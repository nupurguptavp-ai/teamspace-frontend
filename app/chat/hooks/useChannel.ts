'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type Channel = {
  id: string;
  name: string;
};

export function useChannels(workspaceId: string) {
  const [channels, setChannels] = useState<Channel[]>([]);

  const fetchChannels = async () => {
    if (!workspaceId) return;

    try {
      const token = localStorage.getItem('token');

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/channels?workspaceId=${workspaceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChannels(res.data);
    } catch (error) {
      console.error('Failed to fetch channels');
    }
  };

  useEffect(() => {
    fetchChannels();
  }, [workspaceId]);

  return { channels, fetchChannels }; // 👈 IMPORTANT
}