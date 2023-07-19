import { useAuth } from "@/components/Auth";
import PageHead from "@/components/PageHead/PageHead";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import SubmissionsTable from "@/components/Submission/SubmissionsTable";

const Submissions = () => {
  const { authLoading, authenticatedUser } = useAuth();

  if (authLoading) return <p>Loading...</p>;
  if (!authenticatedUser) return <p>Not authenticated</p>;
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
