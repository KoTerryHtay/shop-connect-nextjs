"use client";

import Image from "next/image";
import { SidebarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    // bg-background
    <header className="bg-black text-white dark:text-white sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>

        <header className="w-full ">
          <nav className="flex items-center justify-between px-4 gap-2 h-14 w-full">
            <div className="shrink-0 flex-1">
              <Image
                src="/logo.700a5055.svg"
                alt="logo"
                width={235}
                height={32}
                loading="eager"
              />
            </div>
            <div className="text-white">US English</div>
            <ThemeToggle />
          </nav>
        </header>
      </div>
    </header>
  );
}
