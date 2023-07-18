export const GET_SUBMISSION = `
query getSUBMISSION($id: String!) {
    getSUBMISSION(id: $id) {
        toneFeedback
        response
        problemId
        overallFeedback
        languageFeedback
    }
  }
`;

export const LIST_SUBMISSION_PROBLEM_USER = `
query listSUBMISSION($filter: ModelSUBMISSIONFilterInput!) {
  listSUBMISSION(filter: $filter) {
      items{
      toneFeedback
      response
      problemId
      overallFeedback
      languageFeedback
    }
  }
}

`;
