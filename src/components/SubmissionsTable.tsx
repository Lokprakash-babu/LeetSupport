import { useGql } from "@/hooks/useGql";
import { listSubmissionBasedOnUser } from "@/utils/gqlApi";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useAuth } from "./Auth";

interface IsubmissionDataType {
  problemId: string;
  createdAt: string;
  id: string;
}

const columns: ColumnsType<IsubmissionDataType> = [
  {
    title: "Problem",
    dataIndex: "problemId",
    key: "problemId",
    render: (problemId) => <a key={problemId}>{problemId}</a>,
  },
  {
    title: "Submitted At",
    dataIndex: "createdAt",
    key: "submittedAt",
  },
  {
    title: "Submission",
    dataIndex: "submissionId",
    key: "submissionId",
    render: (submissionId) => {
      return (
        <Link href={`/submissions/${submissionId}`} key={submissionId}>
          View Submission
        </Link>
      );
    },
  },
];

const SubmissionsTable = ({ email }: { email: string }) => {
  const listSubmissionBasedOnUserHandler = async () => {
    const response = await listSubmissionBasedOnUser({
      user: {
        eq: email,
      },
    });
    return response;
  };
  const { data, error, loading, queryHandler } = useGql();

  useEffect(() => {
    queryHandler(listSubmissionBasedOnUserHandler);
  }, []);

  const submissionDataSource: IsubmissionDataType[] = useMemo(() => {
    const dataSource =
      data?.listSUBMISSIONS?.items.map((submission: IsubmissionDataType) => {
        return {
          problemId: submission.problemId,
          createdAt: submission.createdAt,
          submissionId: submission.id,
        };
      }) || [];
    return dataSource;
  }, [data]);

  if (error) return <div>Error</div>;
  return (
    <Table
      columns={columns}
      dataSource={submissionDataSource}
      loading={loading}
    />
  );
};

export default SubmissionsTable;
