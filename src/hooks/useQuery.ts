import { useEffect, useState } from "react";
import { API, Amplify } from "aws-amplify";
import awsConfig from "../aws-exports";
Amplify.configure(awsConfig);

export interface IUseQuery {
  variables: {
    id: string;
  };
}
export const useQuery = (query: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const queryHandler = async (queryOptions: IUseQuery) => {
    setError("");
    setLoading(true);
    try {
      const response = await API.graphql({
        query: query,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: queryOptions.variables,
      });
      console.log("response", response);
      setData(response);
      setLoading(false);
      setError("");
    } catch (err: any) {
      console.log("error", err);
      setError(err);
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     queryHandler();
  //   }, [queryOptions]);
  return {
    data,
    loading,
    error,
    queryHandler,
  };
};
