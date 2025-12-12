"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useClientSession } from "@/hooks/useClientSession";

export default function HomePage() {
  const { data: session } = useClientSession();

  // console.log("Login Page Session >>>", session?.user ?? "");
  // console.log("Login Page status >>>", status);

  return (
    <div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 5 }}
      >
        Home Page
      </motion.div>
      <div>Products</div>
      <div>Discount Products</div>
      <Link href={"/shop"}>Shop Page</Link>

      {session?.user.id && (
        <Button onClick={() => signOut()}>{session.user.email} Sign out</Button>
      )}
    </div>
  );
}
