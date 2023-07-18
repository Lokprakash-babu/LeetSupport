export const CREATE_SUBMISSION = `
mutation createSUBMISSION($input: CreateSUBMISSIONInput!) {
    createSUBMISSION(
      input: $input
    ){
      id
    }
  }
`;

export const LIST_SUBMISSION_BASED_ON_USER = `
query listSUBMISSIONS($filter: ModelSUBMISSIONFilterInput!) {
    listSUBMISSIONS(filter: $filter,  limit: 10) {
      items {
        id
        problemId
        createdAt
      }
      nextToken
    }
  }
`;
