"use client";

import { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  Settings,
  User,
  Music,
  ListMusic,
  Wand2,
  CalendarClock,
  Mic2,
  Heart,
  Radio,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Logo } from "./icons";
import { SongBrowsing } from "./song-browsing";
import { PlaylistManager } from "./playlist-manager";
import { AiRecommender } from "./ai-recommender";
import { ArtistEvents } from "./artist-events";
import { Player } from "./player";

type View = "browse" | "playlists" | "ai" | "events";

export function AppLayout() {
  const [view, setView] = useState<View>("browse");

  const menuItems = [
    { id: "browse", label: "Browse", icon: Music },
    { id: "playlists", label: "Playlists", icon: ListMusic },
    { id: "ai", label: "AI Recommender", icon: Wand2 },
    { id: "events", label: "Events", icon: CalendarClock },
  ] as const;

  const libraryItems = [
    { label: "Liked Songs", icon: Heart },
    { label: "Artists", icon: Mic2 },
    { label: "Stations", icon: Radio },
  ];

  const renderView = () => {
    switch (view) {
      case "browse":
        return <SongBrowsing />;
      case "playlists":
        return <PlaylistManager />;
      case "ai":
        return <AiRecommender />;
      case "events":
        return <ArtistEvents />;
      default:
        return <SongBrowsing />;
    }
  };

  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="items-center justify-center gap-2 p-4 group-data-[collapsible=icon]:justify-center">
            <Logo className="size-8 text-primary group-data-[collapsible=icon]:size-6" />
            <h1 className="font-headline text-xl font-bold tracking-tight text-primary transition-opacity group-data-[collapsible=icon]:opacity-0">
                Connectonic
            </h1>
        </SidebarHeader>
        <SidebarContent>
            <div className="flex flex-col gap-4 p-2">
                <SidebarMenu>
                    {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                            onClick={() => setView(item.id)}
                            isActive={view === item.id}
                            tooltip={item.label}
                        >
                            <item.icon />
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                <Separator />
                 <SidebarMenu>
                    {libraryItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton
                            tooltip={item.label}
                            className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
                        >
                            <item.icon />
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </div>
        </SidebarContent>
        <SidebarFooter className="p-2">
            <Separator className="mb-2"/>
            <div className="flex flex-col gap-2">
                 <SidebarMenu>
                    <SidebarMenuItem>
                         <SidebarMenuButton
                           tooltip="Link Music Platform"
                           className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
                         >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/></svg>
                            <span>Link Music Platform</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <div className="flex items-center gap-3 p-2 group-data-[collapsible=icon]:justify-center">
                    <Avatar className="size-8">
                        <AvatarImage src="https://placehold.co/100x100.png" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col transition-opacity group-data-[collapsible=icon]:opacity-0">
                        <span className="font-semibold">User Name</span>
                        <a href="#" className="text-xs text-muted-foreground hover:text-primary">View Profile</a>
                    </div>
                </div>
            </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <div className="relative flex h-svh flex-col">
            <main className="flex-1 overflow-auto p-4 pt-6 md:p-6 md:pt-8 pb-32">
              {renderView()}
            </main>
            <div className="absolute bottom-0 left-0 right-0 border-t bg-background/50 backdrop-blur-sm">
                <Player />
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
