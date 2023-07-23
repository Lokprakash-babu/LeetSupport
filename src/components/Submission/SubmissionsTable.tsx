import React from "react";
import PaginatedTable from "../PaginatedTable";
import { LIST_SUBMISSION_BASED_ON_USER } from "@/graphql/queries";
import Link from "next/link";
import { Tooltip } from "antd";
import DateRenderer from "../DateRenderer";

export interface ISubmissionTable {
  problemId?: string;
  withProblemColumn?: boolean;
  maxHeight?: string;
}

const minifiedFeedBack = (feedback: string) => {
  return feedback.slice(0, 60) + "...";
};
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
        const { languageFeedback } = record;
        const purifiedFeedback = JSON.parse(languageFeedback);
        const content = purifiedFeedback.content;
        const minifiedContent = minifiedFeedBack(content);
        return (
          <Tooltip title={minifiedContent}>
            <div className="ellipsis-container">
              {purifiedFeedback.content || "NA"}
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
        const { toneFeedback } = record;
        const purifiedFeedback = JSON.parse(toneFeedback);
        const content = purifiedFeedback.content;
        const minifiedContent = minifiedFeedBack(content);
        return (
          <Tooltip title={minifiedContent}>
            <div className="ellipsis-container">
              {purifiedFeedback.content || "NA"}
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
        const { overallFeedback } = record;
        const purifiedFeedback = JSON.parse(overallFeedback);
        const content = purifiedFeedback.content;
        const minifiedContent = minifiedFeedBack(content);
        return (
          <Tooltip title={minifiedContent}>
            <div className="ellipsis-container">
              {purifiedFeedback.content || "NA"}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: "Submitted at (DD/MM/YYYY)",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (record: any) => {
        return <DateRenderer date={record.createdAt} />;
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
