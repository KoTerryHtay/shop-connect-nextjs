import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

export const useClientSession = () => {
  const { data, status, update } = useSession();

  const hasUpdatedRef = useRef(false);

  useEffect(() => {
    if (hasUpdatedRef.current) return;
    hasUpdatedRef.current = true;
    update();
  }, [update]);

  return { data, status, update };
};
