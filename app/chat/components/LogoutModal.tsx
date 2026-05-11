'use client';

import { X, LogOut } from "lucide-react";

export default function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      
      {/* MODAL */}
      <div className="w-[520px] bg-slate-800 border border-slate-700 rounded-2xl p-6 relative shadow-xl">
        
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        {/* HEADER */}
        <div className="flex items-start gap-4 mb-4">
          
          {/* ICON */}
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500/20">
            <LogOut className="text-red-500 w-6 h-6" />
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-white text-xl font-semibold">
              Logout from TeamSpace
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Are you sure you want to logout from your account?
            </p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-300 text-sm mb-6">
          You&apos;ll need to sign in again to access your workspaces and channels.
        </p>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-slate-600 text-gray-300 hover:bg-slate-700"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}