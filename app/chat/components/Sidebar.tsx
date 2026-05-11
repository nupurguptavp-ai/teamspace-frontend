"use client";

import { useChannels } from "../hooks/useChannel";
import { Hash, LogOut, Plus } from "lucide-react";
import CreateChannelModal from "./CreateChannelModal";
import CreateWorkspaceModal from "./CreateWorkspaceModal";
import { useState } from "react";
import WorkspaceDropdown from "./WorkspaceDropdown";
import LogoutModal from "./LogoutModal";

export default function Sidebar({
  workspaceId,
  workspaces,       // ✅ receive from ChatPage
  onWorkspaceChange,
  onSelectChannel,
  selectedChannelId,
  refetch,
}: {
  workspaceId: string;
  workspaces: { id: string; name: string }[];  // ✅
  onWorkspaceChange: (id: string) => void;
  onSelectChannel: (id: string, name: string) => void;
  selectedChannelId: string | null;
  refetch: () => void;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [openWorkspaceModal, setOpenWorkspaceModal] = useState(false);
  const { channels, fetchChannels } = useChannels(workspaceId);
  const [openLogout, setOpenLogout] = useState(false);
  // ✅ removed useWorkspaces() from here

  return (
    <div className="w-100 bg-[#1e293b] p-4 border-r border-slate-700 flex flex-col justify-between">
      <div>
        <div className="mb-4 flex items-center gap-3">
          <div className="text-2xl">💬</div>
          <div>
            <h2 className="text-lg font-semibold text-white">Teamspace</h2>
            <p className="text-sm text-gray-400">Team Communication</p>
          </div>
        </div>

        <WorkspaceDropdown
          workspaceId={workspaceId}
          workspaces={workspaces}   // ✅ pass down
          onWorkspaceChange={onWorkspaceChange}
          refetch={refetch}
        />

        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-400 text-xs tracking-widest">CHANNELS</p>
          <Plus
            className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white"
            onClick={() => setOpenModal(true)}
          />
        </div>

        <div className="space-y-1">
          {channels.map((ch) => {
            const isActive = selectedChannelId === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => onSelectChannel(ch.id, ch.name)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                    : "text-gray-300 hover:bg-slate-700"
                }`}
              >
                <Hash className="w-4 h-4" />
                {ch.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setOpenWorkspaceModal(true)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-white transition mb-2"
        >
          <Plus className="w-4 h-4" />
          Add Workspace
        </button>
        <button
          onClick={() => setOpenLogout(true)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-white transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      <CreateWorkspaceModal
        isOpen={openWorkspaceModal}
        onClose={() => setOpenWorkspaceModal(false)}
        onSuccess={() => refetch()} // ✅ refetch from ChatPage
      />
      <CreateChannelModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        workspaceId={workspaceId}
        onSuccess={fetchChannels}
      />
      <LogoutModal
        isOpen={openLogout}
        onClose={() => setOpenLogout(false)}
        onConfirm={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      />
    </div>
  );
}