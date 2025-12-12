"use client";

import Link from "next/link";
import Image from "next/image";

import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main>
      <div className="h-full flex min-w-fit bg-[#F5F5F5]">
        <div className="relative flex items-center h-fit bg-white mt-16 mx-auto mb-0 rounded-xl pt-14 px-6 pb-10">
          <div className="relative m-auto size-80">
            <Image
              src={"/login-logo.svg"}
              alt="login logo"
              width={320}
              height={320}
              className="hidden md:block"
            />
          </div>
          <div className="absolute left-0 -top-10 font-semibold">Log in</div>
          <div className="text-base leading-5 absolute right-0 -top-10">
            Don&apos;t have an account yet?
            <Link href={"/register"}>
              <span className="ml-2 font-semibold cursor-pointer text-brand-normal">
                Sign up
              </span>
            </Link>
          </div>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}
