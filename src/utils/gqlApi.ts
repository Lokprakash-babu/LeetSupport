import { Amplify, API } from "aws-amplify";
import awsConfig from "../aws-exports";
import {
  CREATE_SUBMISSION,
  LIST_SUBMISSION_BASED_ON_USER,
} from "@/graphql/mutation";
import { GET_SUBMISSION } from "@/graphql/queries";

Amplify.configure(awsConfig);

export interface ICreateSubmission {
  response: string;
  problemId: string;
  user: string;
  languageFeedback?: string;
  toneFeedback?: string;
  overallFeedback?: string;
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

export interface IGetSubmission {
  submissionId: string;
}
export const getSubmission = async (variables: IGetSubmission) => {
  const response = await API.graphql({
    query: GET_SUBMISSION,
    authMode: "AMAZON_COGNITO_USER_POOLS",
    variables: {
      id: variables.submissionId,
    },
  });
  return response;
};

export interface IListSubmissions {
  user: {
    eq: string;
  };
  problemId?: {
    eq: string;
  };
}

export const listSubmissionBasedOnUser = async (
  variables: IListSubmissions
) => {
  const nonDeletedFilter = {
    _deleted: {
      ne: true,
    },
  };
  const response = await API.graphql({
    query: LIST_SUBMISSION_BASED_ON_USER,
    authMode: "AMAZON_COGNITO_USER_POOLS",
    variables: {
      filter: { ...variables, ...nonDeletedFilter },
      limit: 10,
    },
  });
  return response;
};
