import React from "react";

interface RetroWindowProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  className?: string;
}

export default function RetroWindow({
  children,
  title = "SYSTEM",
  className = "",
}: RetroWindowProps) {
  return (
    <div
      className={`relative w-full overflow-hidden border-2 border-stone-800 bg-stone-900 ring-1 ring-blue-500/20 shadow-[10px_10px_0px_0px_rgba(28,25,23,1)] transition-all duration-200 hover:border-cyber-blue hover:shadow-[10px_10px_0px_0px_#3B82F6] ${className}`}
    >
      {/* Header Bar - Stone-200 with Black Text */}
      <div className="flex items-center justify-between border-b-2 border-stone-800 bg-stone-200 px-3 py-2 text-black">
        <div className="flex items-center gap-2">
          {/* Window Controls */}
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full border border-stone-600 bg-stone-400" />
            <div className="h-2.5 w-2.5 rounded-full border border-stone-600 bg-stone-400" />
          </div>
          {/* Title */}
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
            {title}
          </span>
        </div>
        
        {/* Decorative lines */}
        <div className="flex gap-1 opacity-50">
          <div className="h-0.5 w-2 bg-stone-600"></div>
          <div className="h-0.5 w-2 bg-stone-600"></div>
        </div>
      </div>

      {/* Body - Deep Stone-900 */}
      <div className="p-6 text-gray-light">
        {children}
      </div>
    </div>
  );
}
