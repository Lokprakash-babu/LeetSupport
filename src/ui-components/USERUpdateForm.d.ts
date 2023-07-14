/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { USER } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type USERUpdateFormInputValues = {
    email?: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
};
export declare type USERUpdateFormValidationValues = {
    email?: ValidationFunction<string>;
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    userName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type USERUpdateFormOverridesProps = {
    USERUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    userName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type USERUpdateFormProps = React.PropsWithChildren<{
    overrides?: USERUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    uSER?: USER;
    onSubmit?: (fields: USERUpdateFormInputValues) => USERUpdateFormInputValues;
    onSuccess?: (fields: USERUpdateFormInputValues) => void;
    onError?: (fields: USERUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: USERUpdateFormInputValues) => USERUpdateFormInputValues;
    onValidate?: USERUpdateFormValidationValues;
} & React.CSSProperties>;
export default function USERUpdateForm(props: USERUpdateFormProps): React.ReactElement;
