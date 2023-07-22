import { useAuth } from "@/components/Auth";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Unauthenticated from "@/components/Unauthenticated";
import { Button, Result } from "antd";
import Link from "next/link";
import { useEffect } from "react";

const NotFound = () => {
  const {
    isUserLoggedIn,
    setAuthLoading,
    setAuthenticatedUser,
    authLoading,
    authenticatedUser,
  } = useAuth();
  const whoAmI = async () => {
    try {
      await isUserLoggedIn?.();
    } catch (e) {
      setAuthenticatedUser?.(null);
      setAuthLoading?.(false);
    }
  };
  useEffect(() => {
    whoAmI();
  }, []);

  if (!authenticatedUser?.username && !authLoading) {
    return <Unauthenticated />;
  }
  return (
    <>
      {/* <PageHead pageName="Not Found" /> */}
      <PageWrapper>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary">
              <Link href="/practice">Back Home</Link>
            </Button>
          }
        />
      </PageWrapper>
    </>
  );
};

export default NotFound;
