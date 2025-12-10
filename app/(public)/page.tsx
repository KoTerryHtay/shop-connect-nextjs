"use client";

import { useSession } from "next-auth/react";
import { motion } from "motion/react";

export default function HomePage() {
  const { data: session } = useSession();

  console.log("Login Page Session >>>", session?.user ?? "");
  return (
    <div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 5 }}
      >
        Landing Page
      </motion.div>
    </div>
  );
}
