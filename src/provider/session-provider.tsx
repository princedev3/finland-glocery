"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { userStore } from "./user-store";
const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const setSession = userStore((state) => state.setSession);
  const { data: session, status } = useSession();
//   const router = useRouter();
  useEffect(() => {
    if (status === "loading") {
      return;
    }
    // if (!session) {
      // }
      if (session) {
    // router.push("/");
      setSession(session)
    };
  }, [session,setSession]);
  return <>{children}</>;
};

export default SessionProvider;
