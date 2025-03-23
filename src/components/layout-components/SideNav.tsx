"use client";
import
  {
    GRAY_SCALE,
    SIDE_NAV_WIDTH,
    TEMPLATE,
  } from "@/constants/ThemeConstant";
import { useSelector } from "@/store/hooks";
import { Layout } from "antd";
import { Scrollbars } from "react-custom-scrollbars-2";
import MenuContent from "./MenuContent";
const { Sider } = Layout;

export const SideNav = () => {
  const navCollapsed = useSelector((state) => state.customizer.isCollapse);
  return (
    <Sider
      style={{
        height: `calc(100vh - ${TEMPLATE.HEADER_HEIGHT}px)`,
        position: `fixed`,
        top: `${TEMPLATE.HEADER_HEIGHT}px`,
        boxShadow: "0 1px 4px -1px rgba(0, 0, 0, 0.15)",
        zIndex: 999,
        backgroundColor: `${GRAY_SCALE.WHITE}`,
      }}
      className="side-nav"
      width={SIDE_NAV_WIDTH}
      collapsed={navCollapsed}
    >
      <Scrollbars autoHide>
        <MenuContent />
      </Scrollbars>
    </Sider>
  );
};
