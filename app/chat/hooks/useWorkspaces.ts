"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export function useWorkspaces() {
  const [workspaces, setWorkspaces] = useState([]);

  const fetchWorkspaces = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/workspaces`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWorkspaces(res.data);
    } catch (err) {
      console.error("Failed to fetch workspaces", err);
    }
  }, []);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  return { workspaces, refetch: fetchWorkspaces };
}
