"use client";

import * as React from "react";
import { BookA, Handbag, Users } from "lucide-react";

import { NavMain } from "@/features/products/sidebar/components/nav-main";
import { NavProjects } from "@/features/products/sidebar/components/nav-projects";
import { NavUser } from "@/features/products/sidebar/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useClientSession } from "@/hooks/useClientSession";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Order",
      url: "#",
      icon: BookA,
      isActive: true,
      items: [
        {
          title: "Manage orders",
          url: "/dashboard/orders",
        },
        {
          title: "Manage returns",
          url: "/dashboard/orders/returns",
        },
      ],
    },
    {
      title: "Products",
      url: "#",
      icon: Handbag,
      items: [
        {
          title: "Manage products",
          url: "/dashboard/products",
        },
        {
          title: "Add products",
          url: "/dashboard/products/create",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Affiliate",
      url: "/dashboard/affiliate",
      icon: Users,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useClientSession();

  return (
    <Sidebar className="pt-16" collapsible="icon" {...props}>
      <SidebarHeader className="relative pb-6 mr-2">
        <div className="absolute right-0 z-50">
          <SidebarTrigger />
        </div>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{ ...data.user, email: session?.user.email ?? data.user.email }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
