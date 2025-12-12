"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import { ChevronDown, ChevronRight, MapPin } from "lucide-react";

export default function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="max-w-3xl mt-10 mx-auto mb-[103px] pt-6 px-10 pb-10 bg-white rounded-lg">
        <div className=" flex items-center justify-between">
          <div>
            <div className="text-2xl font-medium leading-8 text-[rgba(0,0,0,92)]">
              Welcome to Shop Connect
            </div>
            <div className="mt-1.5 text-sm text-[rgba(0,0,0,65)] font-normal leading-5">
              Please choose the portal you wish to log into.
            </div>
          </div>
          <div className="">
            <Image src="/tiktok-logo.svg" alt="logo" width={120} height={120} />
          </div>
        </div>

        <div className="m-0 p-0">
          {/* 2,131,128 */}
          <div
            className="rounded-lg border border-solid border-black cursor-pointer hover:border-[rgb(2,131,128)] flex h-14 p-2"
            onClick={() => setOpen((open) => !open)}
          >
            <div className="mr-2">
              <Image
                src={"/earth.png"}
                alt="earth logo"
                width={28}
                height={28}
                className="mt-1.5"
              />
            </div>
            <div className="flex-1 mr-2 flex flex-col justify-center">
              <div>
                <div className="text-[rgb(0,0,0,92)] text-lg font-medium leading-6">
                  Asia Seller
                </div>
                <div className="text-[rgb(0,0,0,55)] text-xs leading-4">
                  8 regions
                </div>
              </div>
            </div>
            <div className="text-[rgb(0,0,0,55)] h-4 self-center">
              <ChevronDown className={clsx("w-4", open ? "rotate-180" : "")} />
            </div>
          </div>
          <div
            className={clsx(
              "rounded-lg mt-2 overflow-hidden bg-gray-100",
              open ? "block" : "hidden"
            )}
          >
            <div className="flex min-h-14 pt-2 pr-3.5 pb-2 pl-2 hover:bg-gray-200 group">
              <div className="flex-1 mr-2 flex-wrap">
                <div className="flex items-center pt-2 group-hover:pt-0">
                  <MapPin className="mr-2 size-4" />
                  <div className="text-[rgba(0,0,0,92)] text-sm leading-5">
                    Myanmar Seller
                  </div>
                </div>
                <div className="text-[rgba(0,0,0,55)] text-xs leading-4 ml-6 mt-1 w-full hidden group-hover:block">
                  You registered as a TikTok Shop seller from Myanmar
                </div>
              </div>
              <div className="self-center opacity-0 group-hover:opacity-100">
                <Link href={"/login"}>
                  <button className="bg-[rgba(0,153,149,1)] text-white py-2 px-4 border border-solid border-transparent hover:cursor-pointer rounded-sm h-9 flex items-center">
                    <span>Enter</span>
                    <ChevronRight className="w-4 ml-1" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
