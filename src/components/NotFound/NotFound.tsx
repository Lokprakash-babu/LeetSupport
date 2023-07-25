import { Button, Result } from "antd";
import { useRouter } from "next/router";

export interface INotFound {
  backRoute?: string;
  backText?: string;
}
const NotFound = ({
  backRoute = "/practice",
  backText = "Back to Practice",
}: INotFound) => {
  const router = useRouter();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => router.replace(backRoute)}>
          {backText}
        </Button>
      }
    />
  );
};

export default NotFound;
