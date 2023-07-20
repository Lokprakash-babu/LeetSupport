import { Button, Result } from "antd";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => router.replace("/practice")}>
          Back to Practice
        </Button>
      }
    />
  );
};

export default NotFound;
