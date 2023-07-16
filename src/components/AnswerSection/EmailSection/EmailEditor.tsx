import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import EmailFooter from "./EmailFooter";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export interface IEmailEditor {
  onSubmit: (val: string) => any;
}
const EmailEditor = (props: IEmailEditor) => {
  const [emailValue, setEmailValue] = useState("");
  const [onlyTextContent, setOnlyTextContent] = useState("");
  useEffect(() => {
    setEmailValue("");
    setOnlyTextContent("");
  }, []);
  return (
    <>
      <QuillNoSSRWrapper
        theme="snow"
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
      <EmailFooter
        textContent={onlyTextContent}
        onClick={() => {
          if (onlyTextContent.length >= 250) {
            props.onSubmit(onlyTextContent);
          }
        }}
      />
    </>
  );
};

export default EmailEditor;
