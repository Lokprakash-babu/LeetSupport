import { useAuth } from "@/components/Auth";
import Loader from "@/components/Loader";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { useSidebarContext } from "@/components/Sidebar/Sidebar";
import SubmissionsTable from "@/components/Submission/SubmissionsTable";
import { useRouter } from "next/router";

import { useEffect } from "react";

const Submissions = () => {
  const { expandSidebar } = useSidebarContext();
  const router = useRouter();
  const { authenticatedUser, authLoading } = useAuth();
  useEffect(() => {
    expandSidebar?.();
  }, []);

  if (authLoading) {
    return <Loader />;
  }
  if (!authenticatedUser) {
    router.replace("/user");
    return null;
  }
  return (
    <>
      {/* <PageHead pageName="Submissions" /> */}
      <PageWrapper>
        <SubmissionsTable maxHeight="80vh" withProblemColumn />
      </PageWrapper>
    </>
  );
};

export default Submissions;
