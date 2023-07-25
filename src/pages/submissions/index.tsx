import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { useSidebarContext } from "@/components/Sidebar/Sidebar";
import SubmissionsTable from "@/components/Submission/SubmissionsTable";
import { useEffect } from "react";

const Submissions = () => {
  const { expandSidebar } = useSidebarContext();
  useEffect(() => {
    expandSidebar?.();
  }, []);

  return (
    <>
      <PageWrapper>
        <SubmissionsTable maxHeight="80vh" withProblemColumn />
      </PageWrapper>
    </>
  );
};

export default Submissions;
