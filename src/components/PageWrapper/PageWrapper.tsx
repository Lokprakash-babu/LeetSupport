import React from "react";
import styles from "./PageWrapper.module.css";
interface IPageWrapper {
  children: any;
}
const PageWrapper = (props: IPageWrapper) => {
  return <div className={`${styles.pageWrapper}`}>{props.children}</div>;
};

export default PageWrapper;
