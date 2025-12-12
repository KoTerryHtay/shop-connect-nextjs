"use client";

import Image from "next/image";
import { CircleDollarSign, ReceiptText, Tv } from "lucide-react";

import RegisterForm from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <main>
      <div className="h-full flex min-w-fit">
        <div className="flex flex-col items-center w-screen bg-black">
          <div className="flex justify-between flex-col lg:flex-row gap-11 px-4 lg:px-12">
            {/* First */}
            <div className="flex flex-col banner-pc w-xl">
              <div
                className="flex items-center rounded-md py-2
               text-white font-semibold bg-[linear-gradient(90deg,rgba(51,127,248,0.5)_27%,rgba(51,127,248,0)_100%)] px-5 gap-4"
              >
                <CircleDollarSign className="size-6" />
                <div className="text-xl">0% platform fee for 1st month</div>
              </div>
              <span className="mt-8 font-bold text-white text-3xl lg:text-3xl ">
                <span>Reach </span>
                <span className="text-[#fe2c55]">millions</span>
                <span> of active shoppers on TikTok Shop</span>
              </span>
              <div className="w-fit flex items-center mt-2">
                <div className="flex-1 flex items-center gap-6 opacity-75 text-white">
                  <div className="shrink-0 ">
                    <Tv />
                  </div>
                  <div>Get more sales with LIVE and short videos</div>
                </div>
                <div className="mx-12 w-1 h-16 bg-[#777d99]"></div>
                <div className="flex-1 flex items-center gap-6 text-white opacity-75 ">
                  <div className="shrink-0">
                    <ReceiptText />
                  </div>
                  <div>No minimum followers required</div>
                </div>
              </div>
              <div className="text-sm text-gray-50 mt-2">
                *Earn fee waivers after completing eligible missions in Growth
                Center. Terms &amp; Conditions apply.
              </div>
              <Image
                src={"/register-pic.png"}
                alt="register pic"
                width={640}
                height={480}
                className="hidden lg:block"
              />
            </div>

            {/* Second */}
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
}
