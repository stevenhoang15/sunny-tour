"use client";
import {
    NAV_TYPE_TOP,
    SIDE_NAV_COLLAPSED_WIDTH,
    SIDE_NAV_WIDTH,
} from "@/constants/ThemeConstant";
import {
    toggleMobileSidebar,
    toggleSidebar,
} from "@/store/customizer/CustomizerSlice";
import { useSelector } from "@/store/hooks";
import { AppDispatch } from "@/store/store";
import Header from "./Header";
import HeaderWrapper from "./HeaderWrapper";
import Logo from "../Logo";
import Nav from "./Nav";
import NavEdge from "./NavEdge";
import NavItem from "../NavItem";
import { LeftCircleOutlined, MenuOutlined } from "@ant-design/icons";
import NavNotification from "../NavNotification";
import NavProfile from "../NavProfile";
import { useDispatch } from "react-redux";

export const HeaderNav = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navCollapsed = useSelector((state) => state.customizer.isCollapse);
    const isMobile = useSelector((state) => state.customizer.isMobile);
    const headerNavColor = useSelector((state) => state.customizer.topNavColor);
    const navType = useSelector((state) => state.customizer.navType);
    const isNavTop = navType === NAV_TYPE_TOP;
    const navBgColor = useSelector((state) => state.customizer.topNavColor);
    const navMode = "light";

    const getNavWidth = () => {
        if (isNavTop || isMobile) {
            return "0px";
        }
        if (navCollapsed) {
            return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
        } else {
            return `${SIDE_NAV_WIDTH}px`;
        }
    };
    const onToggle = () => {
        if (!isMobile) {
            dispatch(toggleSidebar());
        } else {
            dispatch(toggleMobileSidebar());
        }
    };
    return (
        <Header headerNavColor={headerNavColor || navBgColor}>
            <HeaderWrapper>
                <Logo logoType={navMode} />
                <Nav navWidth={getNavWidth()}>
                    <NavEdge left>
                        {isNavTop && !isMobile ? null : (
                            <NavItem onClick={onToggle}>
                                <div className="d-flex align-items-center">
                                    {navCollapsed || isMobile ? (
                                        <MenuOutlined className="nav-icon" />
                                    ) : (
                                        <LeftCircleOutlined className="nav-icon" />
                                    )}
                                </div>
                            </NavItem>
                        )}
                    </NavEdge>

                    <NavEdge right>



                        <NavNotification />
                        <NavProfile />


                    </NavEdge>
                </Nav>
            </HeaderWrapper>
        </Header>
    );
};
