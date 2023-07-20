import { useState } from "react";

interface IGqlResponse {
  data: any;
  loading: boolean;
  error: any;
}
export const useGql = () => {
  const [response, setResponse] = useState<IGqlResponse>({
    data: "",
    loading: false,
    error: "",
  });

  const queryHandler = async (query: any) => {
    setResponse({
      ...response,
      loading: true,
    });

    try {
      const responseData = await query();
      setResponse({
        ...response,
        data: responseData.data,
        loading: false,
      });
    } catch (err) {
      setResponse({
        ...response,
        loading: false,
        error: err,
      });
    }
  };

  return {
    ...response,
    queryHandler,
  };
};
