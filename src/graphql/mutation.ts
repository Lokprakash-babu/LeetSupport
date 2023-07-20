export const CREATE_SUBMISSION = `
mutation createSUBMISSION($input: CreateSUBMISSIONInput!) {
    createSUBMISSION(
      input: $input
    ){
      id
    }
  }
`;
