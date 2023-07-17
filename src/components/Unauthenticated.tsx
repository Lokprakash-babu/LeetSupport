import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Unauthenticated = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/user");
  }, []);
  return null;
};

export default Unauthenticated;
