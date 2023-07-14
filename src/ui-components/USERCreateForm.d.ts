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
export declare type USERCreateFormInputValues = {
    email?: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
};
export declare type USERCreateFormValidationValues = {
    email?: ValidationFunction<string>;
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    userName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type USERCreateFormOverridesProps = {
    USERCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    userName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type USERCreateFormProps = React.PropsWithChildren<{
    overrides?: USERCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: USERCreateFormInputValues) => USERCreateFormInputValues;
    onSuccess?: (fields: USERCreateFormInputValues) => void;
    onError?: (fields: USERCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: USERCreateFormInputValues) => USERCreateFormInputValues;
    onValidate?: USERCreateFormValidationValues;
} & React.CSSProperties>;
export default function USERCreateForm(props: USERCreateFormProps): React.ReactElement;
