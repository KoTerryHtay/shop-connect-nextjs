import { useState } from "react";

import { Bookmark, Check, Heart, MessageCircle, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShareArrow } from "@/components/Icons";
import MobileCommentDrawer from "@/features/home/components/MobileCommentDrawer";

export default function PhotoFeedButton() {
  const [add, setAdd] = useState(false);
  const [buttonShow, setButtonShow] = useState(false);
  const [heart, setHeart] = useState(true);
  const [bookmark, setBookmark] = useState(true);

  const handleButton = () => {
    setAdd(true);

    setTimeout(() => {
      setButtonShow(false);
    }, 1000);
  };

  return (
    <div className="absolute right-4 top-1/2 space-y-3 z-10">
      {/* <div className="text-muted-foreground py-2 text-center text-sm">
            </div> */}
      <div className="relative cursor-pointer">
        <Avatar className="size-12">
          <AvatarImage className="" src="/shadcn.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        {buttonShow && (
          <div
            className={cn(
              "rounded-full  size-5 absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center",
              { "bg-red-600": !add, "bg-white": add }
            )}
            onClick={() => {
              handleButton();
            }}
          >
            {add ? (
              <Check color="red" className="size-4" />
            ) : (
              <Plus color="white" className="size-4" />
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center cursor-pointer">
        <Heart
          onClick={() => {
            setHeart((heart) => !heart);
          }}
          fill="white"
          {...(heart && { fill: "red", stroke: "red" })}
        />
        <div className="-mt-0.5 text-xs text-shadow-lg/50 font-semibold">3</div>
      </div>
      <MobileCommentDrawer>
        <div className="flex flex-col items-center cursor-pointer">
          <MessageCircle fill="white" />
          <div className="-mt-0.5 text-xs text-shadow-lg/50 font-semibold">
            3
          </div>
        </div>
      </MobileCommentDrawer>

      <div className="flex flex-col items-center cursor-pointer">
        <Bookmark
          onClick={() => {
            setBookmark((bookmark) => !bookmark);
          }}
          fill="white"
          {...(bookmark && { fill: "yellow", stroke: "yellow" })}
        />
        <div className="-mt-0.5 text-xs text-shadow-lg/50 font-semibold">3</div>
      </div>
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => {
          setAdd(false);
          setButtonShow(true);
        }}
      >
        <ShareArrow className="fill-white w-4 h-4" />
        <div className="-mt-0.5 text-xs text-shadow-lg/50 font-semibold">
          Share
        </div>
      </div>
    </div>
  );
}
