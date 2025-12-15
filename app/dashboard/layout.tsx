import { AppSidebar } from "@/features/products/sidebar/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-gray-50 relative">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-black fixed z-50 w-full">
        <nav className="flex items-center justify-between px-4 gap-2 h-14 w-full">
          <div className="shrink-0 flex-1">
            <Image
              src="/logo.700a5055.svg"
              alt="logo"
              width={235}
              height={32}
            />
          </div>
          <div className="text-white">US English</div>
          <ThemeToggle />
        </nav>
      </header>
      <SidebarProvider className="pt-16">
        <AppSidebar />
        <SidebarInset className="-ml-0.5">
          <ScrollArea className="size-full">
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {children}
            </div>
          </ScrollArea>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
