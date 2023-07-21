import { Skeleton, Spin } from "antd";
import PageWrapper from "./PageWrapper/PageWrapper";
import PageHead from "./PageHead/PageHead";

const Loader = () => {
  return (
    <>
      <PageHead pageName="" />
      <PageWrapper>
        <Skeleton active />
      </PageWrapper>
    </>
  );
};

export default Loader;
