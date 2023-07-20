import { Result } from "antd";

const Error = () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<a href="mailto:devlokprakash100@gmail.com">contact us</a>}
    />
  );
};

export default Error;
