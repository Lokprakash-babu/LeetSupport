import { Button, Popconfirm } from "antd";
import React from "react";
import styles from "../ChatSection.module.css";
import { UserOutlined } from "@ant-design/icons";
export interface IChatHeader {
  customerName: string;
  onEndChat?: () => void;
  isReadOnlyMode?: boolean;
}
const ChatHeader = ({
  customerName,
  onEndChat,
  isReadOnlyMode,
}: IChatHeader) => {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.chatHeaderTitle}>
        <div className={styles.profileInformation}>
          <UserOutlined />
          <h4>{customerName}</h4>
        </div>
        {!isReadOnlyMode && (
          <Popconfirm
            title="Are you sure you want to end chat?"
            okText="Yes"
            cancelText="No"
            onConfirm={onEndChat}
            placement="bottom"
            cancelButtonProps={{
              danger: true,
            }}
          >
            <Button danger type="link">
              End Chat
            </Button>
          </Popconfirm>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
