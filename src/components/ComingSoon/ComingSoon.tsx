import React from "react";
import styles from "./ComingSoon.module.css";

export interface IComingSoonCard {
  title: string;
  description: string;
}
const ComingSoon = (props: IComingSoonCard) => {
  return (
    <div className={`${styles.comingSoonCardContainer}`}>
      <h3 className={`${styles.comingSoonTitle}`}>
        {props.title}
        <div className={`${styles.comingSoonText}`}>(Coming Soon!)</div>
      </h3>
      <p className={`${styles.comingSoonDescription}`}>{props.description}</p>
    </div>
  );
};

export default ComingSoon;
