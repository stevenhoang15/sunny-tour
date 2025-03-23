import React, { useEffect, useState } from "react";
import { Badge, Avatar, List, Button, Popover, Image } from "antd";
import {
  MailOutlined,
  BellOutlined,
  WarningOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import NavItem from "./NavItem";
import Flex from "@/components/shared-components/Flex";
import dayjs from "dayjs";
import { link } from "fs";

interface NotificationItem {
  img?: string;
  type: string;
  icon: string;
  name: string;
  desc: string;
  time: string;
  link: string;
}

const notificationData: [] = [];

const getIcon = (icon: string) => {
  switch (icon) {
    case "mail":
      return <MailOutlined />;
    case "alert":
      return <WarningOutlined />;
    case "check":
      return <CheckCircleOutlined />;
    default:
      return <MailOutlined />;
  }
};

const getNotificationBody = (list: NotificationItem[]) => {
  return list.length > 0 ? (
    <List
      size="small"
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item className="list-clickable">
          <a href={item.link || "#"} target="_blank" rel="noopener noreferrer" className="d-flex w-100">
            <Flex alignItems="center">
              <div className="pr-3">
                {item.img ? (
                  <Avatar src={`/img/avatars/${item.img}`} />
                ) : (
                  <Avatar
                    className={`ant-avatar-${item.type}`}
                    icon={getIcon(item.icon)}
                  />
                )}
              </div>
              <div className="mr-3">
                <span className="font-weight-bold text-dark">{item.name} </span>
                <span className="text-gray-light">{item.desc}</span>
              </div>
              <small className="ml-auto">{item.time}</small>
            </Flex>
          </a>
          
        </List.Item>
      )}
    />
  ) : (
    <div className="empty-notification">
      <Image
        className="d-flex justify-content-center"
        src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
        alt="Thông báo"
        preview={false}
      />
      <p className="mt-3 text-center">Không có dữ liệu</p>
    </div>
  );
};

export const NavNotification: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNotifications = async () => {
  
  };

  useEffect(() => {
  }, []);

  const notificationList = (
    <div style={{ maxWidth: 300 }}>
      <div className="border-bottom d-flex justify-content-between align-items-center px-3 py-2">
        <h4 className="mb-0">Thông báo</h4>
        <Button
          className="text-primary"
          type="text"
          onClick={() => setNotifications([])}
          size="small"
        >
          Xóa
        </Button>
      </div>
      <div className="nav-notification-body">
        {getNotificationBody(notifications)}
      </div>
      {notificationData.length > 0 ? (
        <div className="px-3 py-2 border-top text-center">
          <a className="d-block" href="#/">
            Xem tất cả
          </a>
        </div>
      ) : null}
    </div>
  );

  return (
    <Popover
      placement="bottomRight"
      title={null}
      content={notificationList}
      trigger="click"
      overlayClassName="nav-notification"
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <NavItem>
        <Badge count={notificationData.length}>
          <BellOutlined className="nav-icon mx-auto" type="bell" />
        </Badge>
      </NavItem>
    </Popover>
  );
};

export default NavNotification;
