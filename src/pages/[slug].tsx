import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { Button, Result } from "antd";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      {/* <PageHead pageName="Not Found" /> */}
      <PageWrapper>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary">
              <Link href="/practice">Back Home</Link>
            </Button>
          }
        />
      </PageWrapper>
    </>
  );
};

export default NotFound;
