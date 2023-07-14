/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { SUBMISSION } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SUBMISSIONUpdateFormInputValues = {
    promptId?: string;
    answer?: string;
};
export declare type SUBMISSIONUpdateFormValidationValues = {
    promptId?: ValidationFunction<string>;
    answer?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SUBMISSIONUpdateFormOverridesProps = {
    SUBMISSIONUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    promptId?: PrimitiveOverrideProps<TextFieldProps>;
    answer?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SUBMISSIONUpdateFormProps = React.PropsWithChildren<{
    overrides?: SUBMISSIONUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    sUBMISSION?: SUBMISSION;
    onSubmit?: (fields: SUBMISSIONUpdateFormInputValues) => SUBMISSIONUpdateFormInputValues;
    onSuccess?: (fields: SUBMISSIONUpdateFormInputValues) => void;
    onError?: (fields: SUBMISSIONUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SUBMISSIONUpdateFormInputValues) => SUBMISSIONUpdateFormInputValues;
    onValidate?: SUBMISSIONUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SUBMISSIONUpdateForm(props: SUBMISSIONUpdateFormProps): React.ReactElement;
