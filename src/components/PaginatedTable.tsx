import { IUsePaginateQuery, usePaginateQuery } from "@/hooks/usePaginateQuery";
import Error from "./Error";
import FetchmoreLoader from "./FetchmoreLoader";
import { Empty } from "antd";
import Loader from "./Loader";

export interface IColumnConfig {
  key: string;
  title: string;
  dataIndex: string;
  render: (args: unknown) => JSX.Element;
}
export interface IDataSource {
  [dataIndex: string]: string;
}
export interface IPaginatedTable {
  columnConfig: IColumnConfig[];
  paginatedQueryProps: IUsePaginateQuery;
  //Give maxHeight interms of vh
  maxHeight?: string;
}
const PaginatedTable = ({
  paginatedQueryProps,
  columnConfig,
  maxHeight = "60vh",
}: IPaginatedTable) => {
  const { data, error, fetchMore, loading, hasNext } = usePaginateQuery({
    ...paginatedQueryProps,
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  if (data && data.length === 0) {
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
        No Submissions Available
      </Empty>
    );
  }
  return (
    <div
      className="table-container"
      style={{
        maxHeight: maxHeight,
      }}
    >
      <div className="mobileTable">
        {data?.map((submission) => {
          return (
            <>
              <div key={submission.id} className={"mobileTableItem"}>
                {columnConfig.map((item) => {
                  return (
                    <div key={item.key} className="mobileColumn">
                      <span className="mobileTitle">{item.title}:</span>{" "}
                      {item.render(submission)}
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
      <table className="table paginatedTable">
        <thead>
          <tr>
            {columnConfig.map((item) => {
              return <th key={item.key}>{item.title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((submission) => {
            return (
              <tr key={submission.id}>
                {columnConfig.map((item) => {
                  0;
                  return <td key={item.key}>{item.render(submission)}</td>;
                })}
              </tr>
            );
          })}
          {hasNext && (
            <tr>
              <FetchmoreLoader
                fetchMore={() => {
                  fetchMore();
                }}
              />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaginatedTable;
