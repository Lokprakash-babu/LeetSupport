/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { SUBMISSION } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function SUBMISSIONUpdateForm(props) {
  const {
    id: idProp,
    sUBMISSION: sUBMISSIONModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    problemId: "",
    user: "",
    response: "",
    languageFeedback: "",
    toneFeedback: "",
    overallFeedback: "",
  };
  const [problemId, setProblemId] = React.useState(initialValues.problemId);
  const [user, setUser] = React.useState(initialValues.user);
  const [response, setResponse] = React.useState(initialValues.response);
  const [languageFeedback, setLanguageFeedback] = React.useState(
    initialValues.languageFeedback
  );
  const [toneFeedback, setToneFeedback] = React.useState(
    initialValues.toneFeedback
  );
  const [overallFeedback, setOverallFeedback] = React.useState(
    initialValues.overallFeedback
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = sUBMISSIONRecord
      ? { ...initialValues, ...sUBMISSIONRecord }
      : initialValues;
    setProblemId(cleanValues.problemId);
    setUser(cleanValues.user);
    setResponse(cleanValues.response);
    setLanguageFeedback(cleanValues.languageFeedback);
    setToneFeedback(cleanValues.toneFeedback);
    setOverallFeedback(cleanValues.overallFeedback);
    setErrors({});
  };
  const [sUBMISSIONRecord, setSUBMISSIONRecord] =
    React.useState(sUBMISSIONModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(SUBMISSION, idProp)
        : sUBMISSIONModelProp;
      setSUBMISSIONRecord(record);
    };
    queryData();
  }, [idProp, sUBMISSIONModelProp]);
  React.useEffect(resetStateValues, [sUBMISSIONRecord]);
  const validations = {
    problemId: [{ type: "Required" }],
    user: [{ type: "Required" }],
    response: [{ type: "Required" }],
    languageFeedback: [],
    toneFeedback: [],
    overallFeedback: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          problemId,
          user,
          response,
          languageFeedback,
          toneFeedback,
          overallFeedback,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            SUBMISSION.copyOf(sUBMISSIONRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "SUBMISSIONUpdateForm")}
      {...rest}
    >
      <TextField
        label="Problem id"
        isRequired={true}
        isReadOnly={false}
        value={problemId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              problemId: value,
              user,
              response,
              languageFeedback,
              toneFeedback,
              overallFeedback,
            };
            const result = onChange(modelFields);
            value = result?.problemId ?? value;
          }
          if (errors.problemId?.hasError) {
            runValidationTasks("problemId", value);
          }
          setProblemId(value);
        }}
        onBlur={() => runValidationTasks("problemId", problemId)}
        errorMessage={errors.problemId?.errorMessage}
        hasError={errors.problemId?.hasError}
        {...getOverrideProps(overrides, "problemId")}
      ></TextField>
      <TextField
        label="User"
        isRequired={true}
        isReadOnly={false}
        value={user}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              problemId,
              user: value,
              response,
              languageFeedback,
              toneFeedback,
              overallFeedback,
            };
            const result = onChange(modelFields);
            value = result?.user ?? value;
          }
          if (errors.user?.hasError) {
            runValidationTasks("user", value);
          }
          setUser(value);
        }}
        onBlur={() => runValidationTasks("user", user)}
        errorMessage={errors.user?.errorMessage}
        hasError={errors.user?.hasError}
        {...getOverrideProps(overrides, "user")}
      ></TextField>
      <TextField
        label="Response"
        isRequired={true}
        isReadOnly={false}
        value={response}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              problemId,
              user,
              response: value,
              languageFeedback,
              toneFeedback,
              overallFeedback,
            };
            const result = onChange(modelFields);
            value = result?.response ?? value;
          }
          if (errors.response?.hasError) {
            runValidationTasks("response", value);
          }
          setResponse(value);
        }}
        onBlur={() => runValidationTasks("response", response)}
        errorMessage={errors.response?.errorMessage}
        hasError={errors.response?.hasError}
        {...getOverrideProps(overrides, "response")}
      ></TextField>
      <TextField
        label="Language feedback"
        isRequired={false}
        isReadOnly={false}
        value={languageFeedback}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              problemId,
              user,
              response,
              languageFeedback: value,
              toneFeedback,
              overallFeedback,
            };
            const result = onChange(modelFields);
            value = result?.languageFeedback ?? value;
          }
          if (errors.languageFeedback?.hasError) {
            runValidationTasks("languageFeedback", value);
          }
          setLanguageFeedback(value);
        }}
        onBlur={() => runValidationTasks("languageFeedback", languageFeedback)}
        errorMessage={errors.languageFeedback?.errorMessage}
        hasError={errors.languageFeedback?.hasError}
        {...getOverrideProps(overrides, "languageFeedback")}
      ></TextField>
      <TextField
        label="Tone feedback"
        isRequired={false}
        isReadOnly={false}
        value={toneFeedback}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              problemId,
              user,
              response,
              languageFeedback,
              toneFeedback: value,
              overallFeedback,
            };
            const result = onChange(modelFields);
            value = result?.toneFeedback ?? value;
          }
          if (errors.toneFeedback?.hasError) {
            runValidationTasks("toneFeedback", value);
          }
          setToneFeedback(value);
        }}
        onBlur={() => runValidationTasks("toneFeedback", toneFeedback)}
        errorMessage={errors.toneFeedback?.errorMessage}
        hasError={errors.toneFeedback?.hasError}
        {...getOverrideProps(overrides, "toneFeedback")}
      ></TextField>
      <TextField
        label="Overall feedback"
        isRequired={false}
        isReadOnly={false}
        value={overallFeedback}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              problemId,
              user,
              response,
              languageFeedback,
              toneFeedback,
              overallFeedback: value,
            };
            const result = onChange(modelFields);
            value = result?.overallFeedback ?? value;
          }
          if (errors.overallFeedback?.hasError) {
            runValidationTasks("overallFeedback", value);
          }
          setOverallFeedback(value);
        }}
        onBlur={() => runValidationTasks("overallFeedback", overallFeedback)}
        errorMessage={errors.overallFeedback?.errorMessage}
        hasError={errors.overallFeedback?.hasError}
        {...getOverrideProps(overrides, "overallFeedback")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || sUBMISSIONModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || sUBMISSIONModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
