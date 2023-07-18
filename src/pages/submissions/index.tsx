import { useAuth } from "@/components/Auth";
import PageHead from "@/components/PageHead/PageHead";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import SubmissionsTable from "@/components/SubmissionsTable";

const Submissions = () => {
  const { authLoading, authenticatedUser } = useAuth();

  if (authLoading) return <p>Loading...</p>;
  if (!authenticatedUser) return <p>Not authenticated</p>;
  return (
    <>
      <PageHead pageName="Submissions" />
      <PageWrapper>
        <SubmissionsTable email={authenticatedUser?.attributes?.email} />
      </PageWrapper>
    </>
  );
};

export default Submissions;
