import { Tag } from "antd";
import React from "react";

export type practiceCategory = "chat" | "sales" | "email";
interface IRenderPracticeChip {
  text: string;
  category: practiceCategory;
}

const categoryToColorMap: Record<practiceCategory, string> = {
  chat: "success",
  sales: "warning",
  email: "error",
};
const RenderPracticeChip = (props: IRenderPracticeChip) => {
  return <Tag color={categoryToColorMap[props.category]}>{props.text}</Tag>;
};

export default RenderPracticeChip;
