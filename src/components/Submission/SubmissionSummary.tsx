import SubmissionsTable from "./SubmissionsTable";

export interface ISubmissionSummary {
  problemId: string;
}
const SubmissionSummary = (props: ISubmissionSummary) => {
  return <SubmissionsTable problemId={props.problemId} />;
};

export default SubmissionSummary;
