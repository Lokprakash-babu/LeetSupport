import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerSUBMISSION = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SUBMISSION, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly problemId: string;
  readonly user: string;
  readonly response: string;
  readonly languageFeedback?: string | null;
  readonly toneFeedback?: string | null;
  readonly overallFeedback?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySUBMISSION = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SUBMISSION, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly problemId: string;
  readonly user: string;
  readonly response: string;
  readonly languageFeedback?: string | null;
  readonly toneFeedback?: string | null;
  readonly overallFeedback?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SUBMISSION = LazyLoading extends LazyLoadingDisabled ? EagerSUBMISSION : LazySUBMISSION

export declare const SUBMISSION: (new (init: ModelInit<SUBMISSION>) => SUBMISSION) & {
  copyOf(source: SUBMISSION, mutator: (draft: MutableModel<SUBMISSION>) => MutableModel<SUBMISSION> | void): SUBMISSION;
}