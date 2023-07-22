import { useAuth } from "@/components/Auth";
import Loader from "@/components/Loader";
import PageHead from "@/components/PageHead/PageHead";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { useSidebarContext } from "@/components/Sidebar";
import SubmissionsTable from "@/components/Submission/SubmissionsTable";
import Unauthenticated from "@/components/Unauthenticated";
import { Button, Result } from "antd";
import Link from "next/link";
import { useEffect } from "react";

const Submissions = () => {
  const {
    authLoading,
    authenticatedUser,
    isUserLoggedIn,
    setAuthenticatedUser,
    setAuthLoading,
  } = useAuth();
  const { expandSidebar } = useSidebarContext();

  useEffect(() => {
    expandSidebar?.();
  }, []);

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
  if (authLoading) return <Loader />;
  if (!authenticatedUser)
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary">
            <Link href="/user">Login</Link>
          </Button>
        }
      />
    );
  return (
    <>
      <PageHead pageName="Submissions" />
      <PageWrapper>
        <SubmissionsTable maxHeight="80vh" withProblemColumn />
      </PageWrapper>
    </>
  );
};

export default Submissions;
