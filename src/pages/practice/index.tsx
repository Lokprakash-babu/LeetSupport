import ComingSoon, {
  IComingSoonCard,
} from "@/components/ComingSoon/ComingSoon";
import PageHead from "@/components/PageHead/PageHead";
import RenderPracticeChip, {
  practiceCategory,
} from "@/components/RenderPracticeChip";
import { Table } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "@styles/practice.module.css";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Companies from "@/components/CompaniesTag";
import FilterTag, { IFilterTag } from "@/components/FilterTag/FilterTag";
import Link from "next/link";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const practiceTableColumn = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text: string) => <Link href={"/practice/1"}>{text}</Link>,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (props: { text: string; category: practiceCategory }) => {
      return <RenderPracticeChip text={props.text} category={props.category} />;
    },
  },
  {
    title: "Difficulty",
    dataIndex: "difficulty",
    key: "difficulty",
  },
  {
    title: "Avg.Time",
    key: "avgTime",
    dataIndex: "avgTime",
  },
  {
    title: "Companies",
    key: "companies",
    dataIndex: "companies",
    render: () => <Companies />,
  },
];

const practiceProblems = [
  {
    key: "1",
    title: "Chat Specialist and Pizza!",
    category: {
      text: "chat",
      category: "chat",
    },
    difficulty: "Easy",
    avgTime: "2 mins",
  },
  {
    key: "2",
    title: "Support person and tech Problems",
    category: {
      text: "Email",
      category: "email",
    },
    difficulty: "Medium",
    avgTime: "2 mins",
  },
  {
    key: "3",
    title: "Sales and difficult customer",
    category: {
      text: "Sales",
      category: "sales",
    },
    difficulty: "Hard",
    avgTime: "10 mins",
  },
];

const comingSoonInfo: IComingSoonCard[] = [
  {
    title: "Chat Specialist",
    description:
      "Mastering the Art of Chat: Become a Specialist in 3 Simple Steps!",
  },
  {
    title: "Email Specialist",
    description:
      "Unleash the Persuasive Force: Mastering Email Wizardry for Winning People Over!",
  },
  {
    title: "Sales Specialist",
    description:
      "Ignite Sales Success: Master the Art of Irresistible Pitches for Customer Capture!",
  },
];

const Practice = () => {
  const [activeFilterTag, setActiveFilterTag] = useState("all");
  const FilterTagConfig = [
    {
      filterText: "All",
      onClick() {
        setActiveFilterTag("all");
      },
      activeIdentifier: "all",
    },
    {
      filterText: "Chat",
      onClick() {
        setActiveFilterTag("chat");
        return null;
      },

      activeIdentifier: "chat",
    },
    {
      filterText: "Email",
      onClick() {
        setActiveFilterTag("email");
      },

      activeIdentifier: "email",
    },
    {
      filterText: "Sales",
      onClick() {
        setActiveFilterTag("sales");
      },
      activeIdentifier: "sales",
    },
  ];

  const problemsSet = useMemo(() => {
    return activeFilterTag === "all"
      ? practiceProblems
      : practiceProblems.filter(
          (problem) => problem.category.category === activeFilterTag
        );
  }, [activeFilterTag]);
  return (
    <>
      <PageHead pageName="Practice" />
      <PageWrapper>
        <div>
          <h3 className={`${styles.pageSectionTitle}`}>Learning Paths</h3>
          <div className={`${styles.comingSoonCardContainer}`}>
            {comingSoonInfo.map((comingSoon) => {
              return <ComingSoon key={comingSoon.title} {...comingSoon} />;
            })}
          </div>
        </div>
        <hr />
        <div>
          <h3 className={`${styles.pageSectionTitle}`}>Practice Problems</h3>
          <div className={`${styles.filterCategoryTagContainer}`}>
            {FilterTagConfig.map((filterTag) => {
              return (
                <FilterTag
                  {...filterTag}
                  isActive={activeFilterTag === filterTag.activeIdentifier}
                  key={filterTag.filterText}
                />
              );
            })}
          </div>
          <Table columns={practiceTableColumn} dataSource={problemsSet} />
        </div>
      </PageWrapper>
    </>
  );
};

export default Practice;
