import { ArrowLeftOutlined } from "@ant-design/icons";
import styles from "./PageHead.module.css";
import { useRouter } from "next/router";
import { gray } from "@ant-design/colors";
export interface IPageHead {
  pageName: string;
  withBackBtn?: boolean;
  backRoute?: string;
}

const pageHeaderStylings = {
  backgroundColor: "#DCDFE8",
  color: gray[8],
};
const PageHead = ({
  pageName,
  withBackBtn = false,
  backRoute = "",
}: IPageHead) => {
  const router = useRouter();
  return (
    <div
      className={`${styles.pageHeader} text-pageHeader`}
      style={pageHeaderStylings}
    >
      {withBackBtn && (
        <button
          className={styles.backBtn}
          onClick={(e) => {
            e.preventDefault();
            backRoute ? router.push(backRoute) : router.back();
          }}
        >
          <ArrowLeftOutlined />
        </button>
      )}
      <div className={styles.pageName}>{pageName}</div>
    </div>
  );
};

export default PageHead;
