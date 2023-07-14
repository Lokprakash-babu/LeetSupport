import React from "react";
import styles from "./FilterTag.module.css";
export interface IFilterTag {
  filterText: string;
  onClick: () => any;
  isActive: boolean;
}
const FilterTag = (props: IFilterTag) => {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.filterTagContainer} ${
        props.isActive ? styles.active : ""
      }`}
    >
      {props.filterText}
    </button>
  );
};

export default FilterTag;
