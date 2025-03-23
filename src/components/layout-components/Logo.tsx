import React from 'react';
import { SIDE_NAV_WIDTH, SIDE_NAV_COLLAPSED_WIDTH, NAV_TYPE_TOP } from '@/constants/ThemeConstant';
import { APP_NAME } from '@/configs/AppConfig';
import utils from '@/utils';
import { Grid, Image } from 'antd';
import styled from '@emotion/styled';
import { TEMPLATE } from '@/constants/ThemeConstant';
import { useSelector } from '@/store/hooks';
import Link from "next/link";

const LogoWrapper = styled.div(() => ({
  height: TEMPLATE.HEADER_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  padding: '0 1rem',
  backgroundColor: 'transparent',
  transition: 'all .2s ease',
}));

const { useBreakpoint } = Grid;

interface LogoProps {
  mobileLogo?: boolean;
  logoType: 'light' | 'default';
}


// Component Logo
export const Logo: React.FC<LogoProps> = ({ mobileLogo, logoType }) => {
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg');

  const navCollapsed = useSelector((state) => state.customizer.isCollapse);
  const navType = useSelector((state) => state.customizer.navType);

  const getLogoWidthGutter = (): string | number => {
    const isNavTop = navType === NAV_TYPE_TOP;

    if (isMobile && !mobileLogo) {
      return 0;
    }
    if (isNavTop) {
      return 'auto';
    }
    if (navCollapsed) {
      return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
    } else {
      return `${SIDE_NAV_WIDTH}px`;
    }
  };

  const getLogo = (): string => {
    if (logoType === 'light') {
      if (navCollapsed) {
        return '/img/image1329quoc-huy-viet-nam.png';
      }
      return '/img/image1329quoc-huy-viet-nam.png';
    }

    if (navCollapsed) {
      return '/img/logo-sm.png';
    }
    return '/img/logo.png';
  };

  return (
    <LogoWrapper
      className={isMobile && !mobileLogo ? 'd-none' : 'logo'}
      style={{ width: `${getLogoWidthGutter()}` }}
    >
      <Link href="/dashboard" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <Image src={getLogo()} alt={`${APP_NAME} logo`} preview={false} style={{ width: '50px', height: '50px' }} />
        {!navCollapsed && <p style={{
          color: "white",
          margin: 0,
          textTransform: 'uppercase',
          lineHeight: 1.4,
          fontSize: 16,
          paddingLeft: '5px',
          fontWeight: 'bold'
        }}>Bộ công thương</p>}
      </Link>
    </LogoWrapper>
  );
};

export default Logo;