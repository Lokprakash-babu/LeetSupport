// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SUBMISSION } = initSchema(schema);

export {
  SUBMISSION
};