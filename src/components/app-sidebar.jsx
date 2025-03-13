import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Bot } from "lucide-react";
import { useAuth } from "../contexts/authContext";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Application",
      url: "#",
      items: [
        {
          title: "Chat Bot AI ",
          url: "/room/1",
        },
        {
          title: "Bataille navale ",
          url: "/navalBattle",
        },
        {
          title: "Slot machine ",
          url: "/slotMachine",
        },
      ],
    },
    {
      title: "Options",
      url: "#",
      items: [],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { logout } = useAuth();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex pl-2 gap-2">
          <a href={"/"} className="flex items-center gap-2">
            <Bot />
            <h1 className="font-bold">NexAI</h1>
          </a>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between">
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              <SidebarMenu>
                {item === data.navMain[1] && (
                  <SidebarMenuItem key={"Déconnexion"}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Button onClick={logout}>Déconnexion</Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
