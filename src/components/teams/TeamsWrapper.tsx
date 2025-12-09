// ABOUTME: Main wrapper that provides Microsoft Teams visual chrome.
// ABOUTME: Combines title bar, sidebar, and top nav around app content.

import { ReactNode } from 'react';
import TeamsTitleBar from './TeamsTitleBar';
import TeamsSidebar from './TeamsSidebar';
import TeamsTopNav from './TeamsTopNav';

interface TeamsWrapperProps {
  children: ReactNode;
}

export default function TeamsWrapper({ children }: TeamsWrapperProps) {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#f5f5f5] overflow-hidden">
      <TeamsTitleBar />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block">
          <TeamsSidebar />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <TeamsTopNav />
          
          <div className="flex-1 overflow-auto bg-[#f5f5f5]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
