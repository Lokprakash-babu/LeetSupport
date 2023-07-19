import { IUsePaginateQuery, usePaginateQuery } from "@/hooks/usePaginateQuery";
import Error from "./Error";
import FetchmoreLoader from "./FetchmoreLoader";

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
    return <p>Loading...</p>;
  }

  if (error) {
    return <Error />;
  }
  return (
    <div
      className="table-container"
      style={{
        maxHeight: maxHeight,
      }}
    >
      <table className="table">
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
