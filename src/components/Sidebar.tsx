import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, children }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-20 left-4 z-[1001] transition-all duration-300 ease-out flex flex-col ${
        isMinimized
          ? 'w-12 h-12 rounded-full overflow-hidden'
          : 'w-[360px] max-w-[calc(100vw-2rem)] h-[calc(100vh-6rem)] rounded-2xl'
      } bg-card/95 backdrop-blur-md shadow-2xl border border-border`}
    >
      <div className="h-full flex flex-col overflow-hidden relative">
        {/* Top Control Bar */}
        <div className="absolute top-3 right-3 flex items-center gap-1 z-20">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            title={isMinimized ? 'Expand panel' : 'Minimize panel'}
          >
            {isMinimized ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          {!isMinimized && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
              title="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {!isMinimized && (
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
