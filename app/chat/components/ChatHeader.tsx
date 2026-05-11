'use client';

import { Search, Users, Settings } from 'lucide-react';

type Props = {
  channelName: string;
  channelDescription?: string;
};

export default function ChatHeader({
  channelName,
  channelDescription,
}: Props) {
  return (
    <div className="h-16 border-b border-slate-700 bg-slate-800 flex items-center justify-between px-6">
      
      {/* LEFT SIDE */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-lg">#</span>
          <h1 className="text-white font-semibold text-lg">
            {channelName || 'Select channel'}
          </h1>
        </div>

        {channelDescription && (
          <p className="text-sm text-gray-400">
            {channelDescription}
          </p>
        )}
      </div>
    </div>
  );
}