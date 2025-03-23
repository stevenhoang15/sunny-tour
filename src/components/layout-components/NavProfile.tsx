import React from "react";
import { Dropdown, Avatar, MenuProps } from "antd";
import { useDispatch } from "react-redux";
import {
  EditOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import NavItem from "./NavItem";
import Flex from "@/components/shared-components/Flex";
import styled from "@emotion/styled";
import {
  FONT_WEIGHT,
  MEDIA_QUERIES,
  SPACER,
  FONT_SIZES,
} from "@/constants/ThemeConstant";
import { AppDispatch } from "@/store/store";
import { setLogout } from "@/store/auth/AuthSlice";
import { useRouter } from "next/navigation";
import { useSelector } from "@/store/hooks";
import { resetMenuData } from "@/store/menu/MenuSlice";

// Styled components
const Icon = styled.div(() => ({
  fontSize: FONT_SIZES.LG,
}));

const Profile = styled.div(() => ({
  display: "flex",
  alignItems: "center",
}));

const UserInfo = styled("div")`
  padding-left: ${SPACER[2]};

  @media ${MEDIA_QUERIES.MOBILE} {
    display: none;
  }
`;

const Name = styled.div(() => ({
  fontWeight: FONT_WEIGHT.SEMIBOLD,
}));

const Title = styled.span(() => ({
  opacity: 0.8,
}));

interface MenuItemProps {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface MenuItemSignOutProps {
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, icon }) => (
  <Flex as="a" alignItems="center" gap={SPACER[2]}>
    <Icon>{icon}</Icon>
    <span>{label}</span>
  </Flex>
);

const MenuItemSignOut: React.FC<MenuItemSignOutProps> = ({ label }) => {
  const dispatch = useDispatch<AppDispatch>();
  const route = useRouter();

  const handleSignOut = () => {
    dispatch(setLogout());
    dispatch(resetMenuData());
    route.push("/auth/login");
  };

  return (
    <div onClick={handleSignOut}>
      <Flex alignItems="center" gap={SPACER[2]}>
        <Icon>
          <LogoutOutlined />
        </Icon>
        <span>{label}</span>
      </Flex>
    </div>
  );
};

const items: MenuProps["items"] = [
  {
    key: "Chỉnh sửa thông tin",
    label: (
      <MenuItem path="/" label="Chỉnh sửa thông tin" icon={<EditOutlined />} />
    ),
  },
  {
    key: "Account Setting",
    label: (
      <MenuItem path="/" label="Account Setting" icon={<SettingOutlined />} />
    ),
  },
  {
    key: "Đăng xuất",
    label: <MenuItemSignOut label="Đăng xuất" />,
  },
];

export const NavProfile: React.FC = () => {
  const user = useSelector((state) => state.auth.User);
  return (
    <Dropdown placement="bottomRight" menu={{ items }} trigger={["click"]}>
      <NavItem>
        <Profile>
          <Avatar src={user?.anhDaiDien || "/img/avatars/thumb-12.jpg"} />
          <UserInfo className="profile-text">
            <Name>{user?.name}</Name>
            <Title>{user?.tenDonVi_txt}</Title>
          </UserInfo>
        </Profile>
      </NavItem>
    </Dropdown>
  );
};

export default NavProfile;
