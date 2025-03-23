import styled from '@emotion/styled';
import { GRAY_SCALE } from '@/constants/ThemeConstant';
import utils from '@/utils';
import { MEDIA_QUERIES } from '@/constants/ThemeConstant';

const NavItem = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.5;
  cursor: pointer;
  padding: 0 1rem;
  color: ${utils.rgba(GRAY_SCALE.WHITE, 0.85)};

  @media ${MEDIA_QUERIES.MOBILE} {
    padding: 0 0.75rem;
  }

  .ant-badge {
    color: ${utils.rgba(GRAY_SCALE.WHITE, 0.85)};
  }

  .nav-icon {
    font-size: 1.25rem;
  }

  &:hover,
  &.ant-dropdown-open,
  &.ant-popover-open {
    > * {
      color: ${GRAY_SCALE.WHITE};
    }

    .profile-text {
      color: ${GRAY_SCALE.WHITE};
    }
  }
`;

export default NavItem;