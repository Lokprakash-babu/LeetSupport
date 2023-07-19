import NotFound from "@/components/NotFound/NotFound";
import { useQuery } from "@/hooks/useQuery";
import { useRouter } from "next/router";

const SubmissionDetails = () => {
  const router = useRouter();
  const { submissionId } = router.query;
  //   const {} = useQuery();
  if (!submissionId) {
    return <NotFound />;
  }
  return <div>SubmissionDetails</div>;
};

export default SubmissionDetails;
