import { useEffect, useState } from "react";
import { API, Amplify } from "aws-amplify";
import awsConfig from "../aws-exports";
Amplify.configure(awsConfig);

export interface IUseQuery {
  variables: any;
}
export const useQuery = (query: string, queryOptions?: IUseQuery) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const queryHandler = async () => {
    setLoading(true);
    try {
      const response = await API.graphql({
        query: query,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: { ...queryOptions?.variables },
      });
      setData(response);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    queryHandler();
  }, []);
  return {
    data,
    loading,
    error,
    queryHandler,
  };
};
