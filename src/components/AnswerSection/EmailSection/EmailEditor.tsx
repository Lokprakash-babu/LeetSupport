import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import EmailFooter from "./EmailFooter";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export interface IEmailEditor {
  onSubmit?: (val: {
    chat?: string;
    email?: {
      formattedContent: string;
      unFormattedContent: string;
    };
  }) => any;
  initialValue?: string;
}
const EmailEditor = (props: IEmailEditor) => {
  const [emailValue, setEmailValue] = useState(props.initialValue || "");

  const [onlyTextContent, setOnlyTextContent] = useState("");

  return (
    <>
      <QuillNoSSRWrapper
        theme="snow"
        readOnly={!!props.initialValue}
        style={{
          minHeight: "70vh",
          maxHeight: "70vh",
        }}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link"],
            ["clean"],
          ],
        }}
        value={emailValue}
        onChange={(enteredValue, delta, source, editor) => {
          const textContent = editor.getText().replaceAll("\n", "");
          setOnlyTextContent(textContent);
          setEmailValue(enteredValue);
        }}
      />
      {!!props.onSubmit && (
        <EmailFooter
          textContent={onlyTextContent}
          onClick={() => {
            if (onlyTextContent.length >= 2) {
              props?.onSubmit?.({
                email: {
                  formattedContent: emailValue,
                  unFormattedContent: onlyTextContent,
                },
              });
            }
          }}
        />
      )}
    </>
  );
};

export default EmailEditor;
