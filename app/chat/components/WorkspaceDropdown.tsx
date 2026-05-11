"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function WorkspaceDropdown({
  workspaceId,
  workspaces,      // ✅ receive from parent
  onWorkspaceChange,
  refetch,
}: {
  workspaceId: string;
  workspaces: { id: string; name: string }[];  // ✅
  onWorkspaceChange: (id: string) => void;
  refetch: () => void;
}) {
  const [open, setOpen] = useState(false);

  const current = workspaces.find((w) => w.id === workspaceId);

  return (
    <div className="relative mb-6">
      {/* HEADER */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between bg-slate-700 px-3 py-2 rounded-xl cursor-pointer hover:bg-slate-600"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            {current?.name?.charAt(0) || "T"}
          </div>
          <p className="text-white font-semibold">
            {current?.name || "Select Workspace"}
          </p>
        </div>
        <ChevronDown
          className={`text-gray-300 w-4 h-4 transition ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute top-14 left-0 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-lg z-50 mt-1">
          {workspaces.map((ws) => (
            <button
              key={ws.id}
              onClick={() => {
                onWorkspaceChange(ws.id);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-slate-700 ${
                ws.id === workspaceId ? "text-white" : "text-gray-300"
              }`}
            >
              {ws.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}