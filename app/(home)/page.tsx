"use client";

import PhotoFeed from "@/features/home/components/PhotoFeed";
import { Home } from "lucide-react";

export default function HomePage() {
  // const { data: session } = useClientSession();

  // console.log("Login Page Session >>>", session?.user ?? "");
  // console.log("Login Page status >>>", status);

  return (
    <div className="flex">
      {/* Side Bar */}
      {/* w-[250px] */}
      <div className="hidden md:block border border-green-400 w-fit">
        <div className="flex gap-4">
          <Home />
          <div className="hidden md:block">Home</div>
        </div>
      </div>

      {/* Photo Carousel */}

      <div className="flex-1 h-screen">
        <PhotoFeed />
      </div>
    </div>
  );
}

{
  /* <div className="max-md:hidden md:max-w-sm">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 5 }}
        >
          Home Page
        </motion.div>
        <div className={cn(isMobile ? "text-green-800" : "")}>Mobile</div>
        <div className={cn(!isMobile ? "text-green-800" : "")}>Desktop</div>
        <Link href={"/shop"}>Shop Page</Link>
        <div>Side Bar</div>
        <div>
          {session?.user.id && (
            <Button onClick={() => signOut()}>
              {session.user.email.split(".")[0]}
            </Button>
          )}
        </div>
      </div> */
}
