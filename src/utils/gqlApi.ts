import { Amplify, API } from "aws-amplify";
import awsConfig from "../aws-exports";
import {
  CREATE_SUBMISSION,
  LIST_SUBMISSION_BASED_ON_USER,
} from "@/graphql/mutation";

Amplify.configure(awsConfig);

export interface ICreateSubmission {
  response: string;
  problemId: string;
  user: string;
}
export const createSubmission = async (variables: ICreateSubmission) => {
  const response = await API.graphql({
    query: CREATE_SUBMISSION,
    authMode: "AMAZON_COGNITO_USER_POOLS",
    variables: {
      input: { ...variables },
    },
  });
  return response;
};

export interface IListSubmissions {
  user: {
    eq: string;
  };
}

export const listSubmissionBasedOnUser = async (
  variables: IListSubmissions
) => {
  const response = await API.graphql({
    query: LIST_SUBMISSION_BASED_ON_USER,
    authMode: "AMAZON_COGNITO_USER_POOLS",
    variables: {
      filter: { ...variables },
      limit: 10,
    },
  });
  return response;
};
