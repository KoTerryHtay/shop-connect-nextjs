import { cn } from "@/lib/utils";
import { useState } from "react";

export default function PhotoFeedText({
  text,
  maxLength = 70,
}: {
  text: string;
  maxLength?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={cn("w-[550px] sm:w-md p-1 pr-2 rounded-md", {
        "bg-background/20": isExpanded,
      })}
    >
      <div className="font-semibold">Market & Sales</div>
      <div className="flex items-end">
        <div className="font-normal text-sm">
          {isExpanded ? text : `${text.substring(0, maxLength)}`}
        </div>
        <button
          onClick={toggleExpand}
          className="text-muted-foreground cursor-pointer px-4"
        >
          {isExpanded ? "less" : "more"}
        </button>
      </div>
    </div>
  );
}
