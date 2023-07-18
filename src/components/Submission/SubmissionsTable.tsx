import React from "react";

export interface ISubmissionTable {
  problemId?: string;
}
const SubmissionsTable = (props: ISubmissionTable) => {
  const { problemId } = props;
  // If problem ID is available filter the table data for the particular problemId.
  // Else, list all the submissions for the current user.
  return <div>SubmissionsTable</div>;
};

export default SubmissionsTable;
