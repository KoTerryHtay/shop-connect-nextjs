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
  SidebarRail,
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
    <Sidebar className="pt-14" collapsible="icon" {...props}>
      {/* <SidebarHeader className="relative pb-6 mr-2"></SidebarHeader> */}

      <SidebarContent className="pt-4">
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
