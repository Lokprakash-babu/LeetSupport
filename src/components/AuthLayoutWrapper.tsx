import { useEffect } from "react";
import { useAuth } from "./Auth";
import Illustration from "./Illustrations/Illustration";

import { useRouter } from "next/router";

const MountUser = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/user");
  }, []);
  return null;
};
const AuthLayoutWrapper = ({ children }: { children: any }) => {
  const { authLoading, authenticatedUser } = useAuth();

  if (authLoading) {
    return <Illustration name="customer-support" />;
  }

  if (!authenticatedUser) {
    return <MountUser />;
  }
  return <>{children}</>;
};

export default AuthLayoutWrapper;
