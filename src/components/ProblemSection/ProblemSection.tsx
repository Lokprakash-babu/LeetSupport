import React from "react";
import styles from "./ProblemSection.module.css";
import { Tag } from "antd";
export interface IProblemSection {
  description: string;
  expectations: string[];
  category: string;
  difficulty: string;
  companiesAskedIn: string[];
}

const ProblemSection = (props: IProblemSection) => {
  const { category, difficulty } = props;
  return (
    <>
      <div className={`${styles.problemCategoryContainer}`}>
        <Tag>{category}</Tag>
        <Tag>{difficulty}</Tag>
      </div>
      <div className={`${styles.problemDescriptionContainer}`}>
        <h4 className={`${styles.sectionTitle}`}>Description</h4>
        {props.description}
      </div>
      <div>
        <h3 className={`${styles.sectionTitle}`}>Expectations</h3>
        <ul className={`${styles.problemExpectations}`}>
          {props.expectations.map((expectation, index) => (
            <li key={index}>{expectation}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProblemSection;
