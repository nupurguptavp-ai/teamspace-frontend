"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import { useChatSocket } from "./hooks/useChatSocket";
import ChatHeader from "./components/ChatHeader";
import { useWorkspaces } from "./hooks/useWorkspaces";

export default function ChatPage() {
  const [workspaceId, setWorkspaceId] = useState<string>("");
  const [channelId, setChannelId] = useState<string | null>(null);
  const [channelName, setChannelName] = useState<string>("");

  const { messages, sendMessage } = useChatSocket(channelId);
  const { workspaces, refetch } = useWorkspaces(); // ✅ single source of truth

  // ✅ auto-select first workspace
  useEffect(() => {
    if (workspaces.length > 0 && !workspaceId) {
      setWorkspaceId(workspaces[0].id);
    }
  }, [workspaces, workspaceId]);

  return (
    <div className="flex bg-slate-900 w-full">
      <Sidebar
        workspaceId={workspaceId}
        workspaces={workspaces}       // ✅ pass down
        onWorkspaceChange={(id) => {
          setWorkspaceId(id);
          setChannelId(null);
          setChannelName("");
        }}
        onSelectChannel={(id, name) => {
          setChannelId(id);
          setChannelName(name);
        }}
        selectedChannelId={channelId}
        refetch={refetch}             // ✅ pass down
      />

      <div className="flex-1 flex flex-col">
        {channelId ? (
          <>
            <ChatHeader channelName={channelName} />
            <div className="flex-1 overflow-y-auto">
              <MessageList messages={messages} />
            </div>
            <div className="p-4 border-t border-slate-700">
              <MessageInput onSend={sendMessage} />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a channel
          </div>
        )}
      </div>
    </div>
  );
}