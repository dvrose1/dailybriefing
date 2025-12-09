# Teams Visual Wrapper Spec

Add a realistic Microsoft Teams wrapper around the existing prototype. The goal is to make it look like our app is running as a native Teams personal app.

**Important:** This wraps around your existing prototype. Don't change any of the existing briefing components — just add the Teams chrome around them.

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ← →  Microsoft Teams                                            ─  □  ×   │  ← Title bar
├─────┬───────────────────────────────────────────────────────────────────────┤
│     │  ≡  Daily Briefing Agent              🔍 Search                   ••• │  ← Top nav
│ 🔔  ├───────────────────────────────────────────────────────────────────────┤
│     │                                                                       │
│ 💬  │                                                                       │
│     │                                                                       │
│ 👥  │              ┌─────────────────────────────────────────┐              │
│     │              │                                         │              │
│ 📅  │              │      YOUR EXISTING PROTOTYPE            │              │
│     │              │                                         │              │
│ 📞  │              │      (BriefingHeader, InsightCards,     │              │
│     │              │       BriefMe, VoicePlayer, etc.)       │              │
│ 📁  │              │                                         │              │
│     │              │                                         │              │
│ ••• │              └─────────────────────────────────────────┘              │
│     │                                                                       │
│ 📊  │  ← Daily Briefing icon (active/highlighted)                           │
│     │                                                                       │
│ 🛒  │                                                                       │
│     │                                                                       │
├─────┼───────────────────────────────────────────────────────────────────────┤
│  👤 │                                                                       │  ← User avatar at bottom
└─────┴───────────────────────────────────────────────────────────────────────┘
```

---

## Component: TeamsWrapper.tsx

This is the outer shell. Your existing app renders inside it.

```tsx
// components/TeamsWrapper.tsx

interface TeamsWrapperProps {
  children: React.ReactNode;
}

export function TeamsWrapper({ children }: TeamsWrapperProps) {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#f5f5f5] overflow-hidden">
      {/* Title Bar */}
      <TeamsTitleBar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <TeamsSidebar />
        
        {/* Main Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Nav */}
          <TeamsTopNav />
          
          {/* Content Area - Your Prototype Goes Here */}
          <div className="flex-1 overflow-auto bg-[#f5f5f5]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Component: TeamsTitleBar.tsx

The purple/dark bar at the very top with window controls.

```tsx
// components/teams/TeamsTitleBar.tsx

export function TeamsTitleBar() {
  return (
    <div className="h-8 bg-[#5b5fc7] flex items-center justify-between px-2 select-none">
      {/* Left: Navigation arrows */}
      <div className="flex items-center gap-2 text-white/70">
        <button className="p-1 hover:bg-white/10 rounded">
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-white/10 rounded">
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
      
      {/* Center: Title */}
      <div className="text-white text-sm font-medium">
        Microsoft Teams
      </div>
      
      {/* Right: Window controls */}
      <div className="flex items-center">
        <button className="px-3 py-1 hover:bg-white/10 text-white/70">
          <MinusIcon className="w-4 h-4" />
        </button>
        <button className="px-3 py-1 hover:bg-white/10 text-white/70">
          <SquareIcon className="w-3 h-3" />
        </button>
        <button className="px-3 py-1 hover:bg-red-500 text-white/70 hover:text-white">
          <XIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
```

**Styling notes:**
- Background: `#5b5fc7` (Teams purple)
- Height: 32px
- Window controls don't need to work — they're visual only

---

## Component: TeamsSidebar.tsx

The left icon rail with Teams navigation.

```tsx
// components/teams/TeamsSidebar.tsx

const sidebarItems = [
  { icon: "activity", label: "Activity", notifications: 3 },
  { icon: "chat", label: "Chat", notifications: 0 },
  { icon: "teams", label: "Teams", notifications: 0 },
  { icon: "calendar", label: "Calendar", notifications: 0 },
  { icon: "calls", label: "Calls", notifications: 0 },
  { icon: "files", label: "Files", notifications: 0 },
];

export function TeamsSidebar() {
  return (
    <div className="w-16 bg-[#ebebeb] flex flex-col items-center py-2 border-r border-gray-300">
      {/* Top section - main nav */}
      <div className="flex flex-col items-center gap-1">
        {sidebarItems.map((item) => (
          <SidebarIcon 
            key={item.icon}
            icon={item.icon}
            label={item.label}
            notifications={item.notifications}
            active={false}
          />
        ))}
      </div>
      
      {/* Divider */}
      <div className="my-3 w-8 border-t border-gray-400" />
      
      {/* Apps section */}
      <div className="flex flex-col items-center gap-1">
        {/* Daily Briefing - ACTIVE */}
        <SidebarIcon 
          icon="briefing"
          label="Daily Briefing"
          active={true}
        />
        
        {/* More apps */}
        <SidebarIcon 
          icon="more"
          label="More apps"
          active={false}
        />
      </div>
      
      {/* Spacer */}
      <div className="flex-1" />
      
      {/* Bottom - User avatar */}
      <div className="mb-2">
        <div className="w-8 h-8 rounded-full bg-[#5b5fc7] flex items-center justify-center text-white text-sm font-medium">
          SF
        </div>
      </div>
    </div>
  );
}

function SidebarIcon({ icon, label, active, notifications }) {
  return (
    <div className={`
      w-12 h-12 flex flex-col items-center justify-center rounded-md cursor-pointer
      ${active ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}
    `}>
      {/* Icon */}
      <div className="relative">
        <TeamsIcon name={icon} className={`w-5 h-5 ${active ? 'text-[#5b5fc7]' : 'text-gray-600'}`} />
        {notifications > 0 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            {notifications}
          </div>
        )}
      </div>
      {/* Label */}
      <span className={`text-[10px] mt-0.5 ${active ? 'text-[#5b5fc7] font-medium' : 'text-gray-600'}`}>
        {label.split(' ')[0]}
      </span>
    </div>
  );
}
```

**Icon options:**
Use Lucide icons or simple SVGs:
- Activity: `Bell` or `Activity`
- Chat: `MessageSquare`
- Teams: `Users`
- Calendar: `Calendar`
- Calls: `Phone`
- Files: `Folder`
- Briefing: `Newspaper` or `LayoutDashboard` or `Sparkles` (for AI feel)
- More: `MoreHorizontal` or grid icon

**Styling notes:**
- Background: `#ebebeb` (light gray)
- Width: 64px
- Active item: white background with subtle shadow, purple icon
- Inactive: gray icons, hover shows slightly darker background

---

## Component: TeamsTopNav.tsx

The horizontal bar above the content with app name and search.

```tsx
// components/teams/TeamsTopNav.tsx

export function TeamsTopNav() {
  return (
    <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Left: Hamburger + App name */}
      <div className="flex items-center gap-3">
        <button className="p-1 hover:bg-gray-100 rounded">
          <MenuIcon className="w-5 h-5 text-gray-600" />
        </button>
        <span className="font-semibold text-gray-800">Daily Briefing Agent</span>
      </div>
      
      {/* Center: Search (optional) */}
      <div className="flex-1 max-w-md mx-4">
        <div className="flex items-center gap-2 bg-[#f5f5f5] rounded-md px-3 py-1.5 text-sm text-gray-500">
          <SearchIcon className="w-4 h-4" />
          <span>Search</span>
          <span className="ml-auto text-xs text-gray-400">⌘F</span>
        </div>
      </div>
      
      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded">
          <MoreHorizontalIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
```

**Styling notes:**
- Background: white
- Height: 48px
- Border bottom: subtle gray

---

## Integration

**In your main layout or page:**

```tsx
// app/layout.tsx or app/page.tsx

import { TeamsWrapper } from '@/components/teams/TeamsWrapper';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <TeamsWrapper>
          {children}
        </TeamsWrapper>
      </body>
    </html>
  );
}
```

**Remove your existing fake sidebar** (the narrow dark one you had before) — Teams wrapper provides the real-looking one now.

---

## Colors Reference

| Element | Color |
|---------|-------|
| Title bar background | `#5b5fc7` |
| Sidebar background | `#ebebeb` |
| Top nav background | `#ffffff` |
| Content background | `#f5f5f5` |
| Active icon/text | `#5b5fc7` |
| Inactive icon/text | `#616161` |
| Notification badge | `#c4314b` |

---

## Optional: Add Teams-style Loading State

When the page first loads, show Teams-style loading:

```tsx
function TeamsLoadingScreen() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-[#f5f5f5]">
      <div className="w-12 h-12 mb-4">
        {/* Teams logo or spinner */}
        <div className="w-12 h-12 border-4 border-[#5b5fc7] border-t-transparent rounded-full animate-spin" />
      </div>
      <span className="text-gray-600">Loading Daily Briefing...</span>
    </div>
  );
}
```

---

## Checklist

- [ ] Title bar with Teams purple, window controls
- [ ] Left sidebar with icons (Activity, Chat, Teams, Calendar, Calls, Files)
- [ ] Daily Briefing icon highlighted as active
- [ ] Notification badge on Activity (shows app is "live")
- [ ] User avatar at bottom of sidebar (initials "SF" for Sarah Fish)
- [ ] Top nav with app name and search bar
- [ ] Existing prototype renders in content area unchanged
- [ ] Remove old fake sidebar from prototype
- [ ] Overall looks like actual Teams window

---

## Demo Script Update

When presenting:

> "Let me show you what this looks like in Microsoft Teams — where your marketing team already works every day. Sarah opens Teams, sees the Daily Briefing app in her sidebar, clicks it... and here's her briefing. No new tool to learn, no new login, no context switching."
