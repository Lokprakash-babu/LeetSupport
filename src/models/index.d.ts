import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerSUBMISSION = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SUBMISSION, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly promptId: string;
  readonly answer?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySUBMISSION = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SUBMISSION, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly promptId: string;
  readonly answer?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SUBMISSION = LazyLoading extends LazyLoadingDisabled ? EagerSUBMISSION : LazySUBMISSION

export declare const SUBMISSION: (new (init: ModelInit<SUBMISSION>) => SUBMISSION) & {
  copyOf(source: SUBMISSION, mutator: (draft: MutableModel<SUBMISSION>) => MutableModel<SUBMISSION> | void): SUBMISSION;
}

type EagerUSER = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<USER, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly userName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUSER = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<USER, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly userName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type USER = LazyLoading extends LazyLoadingDisabled ? EagerUSER : LazyUSER

export declare const USER: (new (init: ModelInit<USER>) => USER) & {
  copyOf(source: USER, mutator: (draft: MutableModel<USER>) => MutableModel<USER> | void): USER;
}