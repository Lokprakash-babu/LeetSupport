/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SUBMISSIONCreateFormInputValues = {
    problemId?: string;
    user?: string;
    response?: string;
    languageFeedback?: string;
    toneFeedback?: string;
    overallFeedback?: string;
};
export declare type SUBMISSIONCreateFormValidationValues = {
    problemId?: ValidationFunction<string>;
    user?: ValidationFunction<string>;
    response?: ValidationFunction<string>;
    languageFeedback?: ValidationFunction<string>;
    toneFeedback?: ValidationFunction<string>;
    overallFeedback?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SUBMISSIONCreateFormOverridesProps = {
    SUBMISSIONCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    problemId?: PrimitiveOverrideProps<TextFieldProps>;
    user?: PrimitiveOverrideProps<TextFieldProps>;
    response?: PrimitiveOverrideProps<TextFieldProps>;
    languageFeedback?: PrimitiveOverrideProps<TextFieldProps>;
    toneFeedback?: PrimitiveOverrideProps<TextFieldProps>;
    overallFeedback?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SUBMISSIONCreateFormProps = React.PropsWithChildren<{
    overrides?: SUBMISSIONCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SUBMISSIONCreateFormInputValues) => SUBMISSIONCreateFormInputValues;
    onSuccess?: (fields: SUBMISSIONCreateFormInputValues) => void;
    onError?: (fields: SUBMISSIONCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SUBMISSIONCreateFormInputValues) => SUBMISSIONCreateFormInputValues;
    onValidate?: SUBMISSIONCreateFormValidationValues;
} & React.CSSProperties>;
export default function SUBMISSIONCreateForm(props: SUBMISSIONCreateFormProps): React.ReactElement;
