import { getSubmission } from "@/utils/gqlApi";
import { useEffect, useState } from "react";
import Error from "../Error";

export interface ISubmissionSummary {
  submissionId: string;
}
const SubmissionSummary = (props: ISubmissionSummary) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({});
  const { submissionId } = props;

  const getSubmissionHandler = async () => {
    setIsLoading(true);
    try {
      const response = await getSubmission({
        submissionId,
      });
      //@ts-ignore
      setData(response.data.getSUBMISSION);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSubmissionHandler();
  }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <Error />;
  }
  console.log("submission data", data);
  return <div>{submissionId}</div>;
};

export default SubmissionSummary;
