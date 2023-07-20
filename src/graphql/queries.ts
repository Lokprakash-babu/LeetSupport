export const GET_SUBMISSION = `
query getSUBMISSION($id: ID!) {
    getSUBMISSION(id: $id) {
        id
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

export const LIST_SUBMISSION_BASED_ON_USER = `
query listSUBMISSIONS($filter: ModelSUBMISSIONFilterInput!) {
    listSUBMISSIONS(filter: $filter,  limit: 1000) {
      items {
        id
        problemId
        createdAt
        _deleted
        user
        languageFeedback
      overallFeedback
      toneFeedback
      }
      nextToken
    }
  }
`;
