import React from "react";
import PaginatedTable from "../PaginatedTable";
import { LIST_SUBMISSION_BASED_ON_USER } from "@/graphql/queries";
import Link from "next/link";
import { Tooltip } from "antd";

export interface ISubmissionTable {
  problemId?: string;
  withProblemColumn?: boolean;
  maxHeight?: string;
}

const SubmissionsTable = (props: ISubmissionTable) => {
  const { problemId } = props;

  const submissionTableColumn = [
    {
      title: "Submission",
      dataIndex: "id",
      key: "submissionId",
      render: (record: any) => {
        return (
          <Link href={`/submissions/${record.id}`} target="_blank">
            View Submission
          </Link>
        );
      },
    },

    {
      title: "Language Feedback",
      dataIndex: "languageFeedback",
      key: "languageFeedback",
      render: (record: any) => {
        return (
          <Tooltip title={record.languageFeedback}>
            <div className="ellipsis-container">
              {record.languageFeedback || "NA"}
            </div>
          </Tooltip>
        );
      },
    },

    {
      title: "Tone Feedback",
      dataIndex: "toneFeedback",
      key: "toneFeedback",
      render: (record: any) => {
        return (
          <Tooltip title={record.languageFeedback}>
            <div className="ellipsis-container">
              {record.toneFeedback || "NA"}
            </div>
          </Tooltip>
        );
      },
    },

    {
      title: "Overall Feedback",
      dataIndex: "overallFeedback",
      key: "overallFeedback",
      render: (record: any) => {
        return (
          <Tooltip title={record.languageFeedback}>
            <div className="ellipsis-container">
              {record.overallFeedback || "NA"}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: "Submitted at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (record: any) => {
        return <p>{record.createdAt}</p>;
      },
    },
  ];

  if (props.withProblemColumn) {
    submissionTableColumn.splice(1, 0, {
      title: "Problem",
      dataIndex: "problem",
      key: "problem",
      render: (record: any) => {
        return (
          <Link href={`/practice/${record.problemId}`} target="_blanck">
            View Problem
          </Link>
        );
      },
    });
  }
  // If problem ID is available filter the table data for the particular problemId.
  // Else, list all the submissions for the current user.
  const queryVariable = !!problemId
    ? {
        problemId: {
          eq: problemId,
        },
      }
    : {};
  return (
    <PaginatedTable
      columnConfig={submissionTableColumn}
      paginatedQueryProps={{
        query: LIST_SUBMISSION_BASED_ON_USER,
        queryName: "listSUBMISSIONS",
        variables: queryVariable,
      }}
      maxHeight={props.maxHeight || "60vh"}
    />
  );
};

export default SubmissionsTable;
