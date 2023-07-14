// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SUBMISSION, USER } = initSchema(schema);

export {
  SUBMISSION,
  USER
};