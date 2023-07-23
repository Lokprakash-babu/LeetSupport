import PageHead from "@/components/PageHead/PageHead";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { useSidebarContext } from "@/components/Sidebar";
import SubmissionsTable from "@/components/Submission/SubmissionsTable";
import { requireAuth } from "@/utils/requireAuth";

import { useEffect } from "react";

const Submissions = () => {
  const { expandSidebar } = useSidebarContext();

  useEffect(() => {
    expandSidebar?.();
  }, []);

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
export const getServerSideProps = requireAuth;
