import { Heart, ThumbsDown, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MobileCommentDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="bg-[#F5F5F5] sm:max-w-lg mx-auto ">
          {/* <DrawerContent className="bg-[#F5F5F5] sm:w-xl w-full mx-auto"> */}
          <DrawerHeader className="relative">
            <DrawerTitle className="text-black font-semibold text-sm">
              11 comments
            </DrawerTitle>
            <DrawerClose asChild>
              <X color="black" className="size-5 absolute right-4" />
            </DrawerClose>
          </DrawerHeader>

          <div className="text-black flex bg-gray-200 gap-2 px-4">
            <Avatar className="size-12 mt-2">
              <AvatarImage className="" src="/shadcn.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex flex-col">
              <div className="font-semibold text-gray-700">Shadcn</div>
              <div className="text-sm">
                very good very good very good very good very good very good very
                good very good very good very good very good very good
              </div>
              <div className="flex justify-between items-center">
                <div className="space-x-4">
                  <span className="text-xs text-gray-400">16h</span>
                  <span className="cursor-pointer text-sm font-semibold text-gray-500">
                    Reply
                  </span>
                </div>
                <div className="flex items-end gap-8">
                  <span className="inline-flex items-center gap-0.5">
                    <Heart className="size-4" color="#99a1af" fill="#99a1af" />
                    <span className="text-xs text-gray-500">1</span>
                  </span>
                  <span className="inline-flex items-center gap-0.5">
                    <ThumbsDown
                      className="size-4"
                      color="#99a1af"
                      fill="#99a1af"
                    />
                    <span className="text-xs text-gray-500">1</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter>
            <Input placeholder="Add comment..." />

            {/* <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Desktop Comment */}
      {/* <div className="max-md:hidden md:w-lg">Desktop Photo Comment</div> */}
    </div>
  );
}
