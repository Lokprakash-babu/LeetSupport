import { API, Amplify } from "aws-amplify";
import React, { useEffect, useState } from "react";
import awsConfig from "../aws-exports";
Amplify.configure(awsConfig);

export interface IUsePaginateQuery {
  query: string;
  variables: any;
  queryName: string;
  pageLimit?: number;
}
export const usePaginateQuery = ({
  query,
  variables,
  pageLimit = 1000,
  queryName,
}: IUsePaginateQuery) => {
  const [data, setData] = React.useState<any[]>([]);
  const [loading, setIsLoading] = React.useState(false);
  const [error, setIsError] = useState("");
  const [hasNext, setHasNext] = useState("");
  const queryFiringHandler = async (nextToken = "") => {
    const nonDeletedFilter = {
      _deleted: {
        ne: true,
      },
    };
    const queryVariables = {
      ...variables,
      ...nonDeletedFilter,
    };
    if (nextToken) {
      queryVariables["nextToken"] = nextToken;
    }
    setIsLoading(true);
    try {
      const response = await API.graphql({
        query: query,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          filter: queryVariables,
          limit: pageLimit,
        },
      });
      //@ts-ignore
      const items = response.data[queryName].items;
      //@ts-ignore
      const hasNext = response.data[queryName].nextToken;
      setHasNext(hasNext);
      setData([...data, ...items]);
      setIsLoading(false);
    } catch (err: any) {
      console.log("error", err);
      setIsError(err.message);
      setIsLoading(false);
    }
  };

  const fetchMore = () => {
    return queryFiringHandler(hasNext);
  };

  useEffect(() => {
    queryFiringHandler();
  }, []);
  if (loading) {
    return {
      data: [],
      loading: true,
      error: "",
      queryFiringHandler,
      fetchMore,
    };
  }
  if (error) {
    return {
      data: [],
      loading: false,
      error: error,
      queryFiringHandler,
      fetchMore,
    };
  }
  return {
    data,
    loading: false,
    error: "",
    queryFiringHandler,
    fetchMore,
    hasNext,
  };
};
