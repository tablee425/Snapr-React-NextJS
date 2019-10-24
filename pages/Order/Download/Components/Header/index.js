import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NoSSR from 'react-no-ssr';
import moment from 'moment';

import { DivRow, DivColumn, YellowButton, Avatar as NormalAvatar, MobileNav } from '~/components';
import Colors from '~/utils/colors';
import { AuthRequest } from '~/utils/services';
import { pushRoute } from '~/utils/utils';
import { Media } from '~/utils/constants';

const Header = ({ order, user }) => {
  const startTime = moment(order.startTime);
  const dateString = startTime.format('HHmm - dddd DD MMMM YYYY');

  options.left[1] = { ...options.left[1], isHidden: order.reviewPossible, href: `/order/${order.id}` };
  options.right[0] = {
    ...options.right[0],
    isHidden: !order.reviewPossible,
    href: `/order/review/${order.id}`,
  };

  return (
    <div>
      <MobileNav menus={[...options.left, ...options.right]} />

      <HeaderContainer>
        <TitleWrapper>
          <HeaderTitle>Downloads</HeaderTitle>

          <SubHeaderContainer>
            <SubHeader>Order #</SubHeader>
            <SubHeader style={{ marginLeft: 40 }}>{order.case}</SubHeader>
          </SubHeaderContainer>

          <NoSSR>
            <SubHeader style={{ fontSize: 16 }}>{dateString}</SubHeader>
          </NoSSR>

          <SubHeaderContainer>
            <SubHeader>Address</SubHeader>
            <SubGreyHeader style={{ marginLeft: 30 }}>{order.address}</SubGreyHeader>
          </SubHeaderContainer>

          {order.product.indexOf('Photography') > -1 && (
            <SubHeaderContainer>
              <SubHeader>Photos</SubHeader>
              <SubGreyHeader style={{ marginLeft: 35 }}>
                {order.photographerToBeTaken.type === 0 ? 'PhotographersChoice' : 'SpecificPhotographers'}
              </SubGreyHeader>
            </SubHeaderContainer>
          )}
        </TitleWrapper>

        <ActionWrapper>
          <HeaderLeftPanel>
            {options.left.map(
              ({ label, isHidden, ...props }) =>
                !isHidden && (
                  <YellowButton key={label} onClick={() => onHeaderClick(props)}>
                    {label}
                  </YellowButton>
                ),
            )}
          </HeaderLeftPanel>

          <HeaderRightPanel>
            <Avatar src={user.avatarLink} />
            {options.right.map(
              ({ label, isHidden, ...props }) =>
                !isHidden && (
                  <YellowButton key={label} onClick={() => onHeaderClick(props)}>
                    {label}
                  </YellowButton>
                ),
            )}
          </HeaderRightPanel>
        </ActionWrapper>
      </HeaderContainer>
    </div>
  );
};

export const onHeaderClick = ({ href, onClick }) => {
  if (onClick) {
    onClick();
  } else {
    pushRoute(href);
  }
};

export const HeaderContainer = DivColumn.extend`
  flex: none;
  align-items: center;
  position: relative;
  margin: 0 50px;

  ${Media.desktop`
    margin: 0;
  `};
`;

export const ActionWrapper = DivRow.extend`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  justify-content: space-between;
  align-items: center;

  ${Media.phone`
    display: none;
  `};
`;

export const HeaderLeftPanel = DivRow.extend`
  flex: none;
  align-items: center;
  
  ${YellowButton} + ${YellowButton} {
    margin-left: 20px;
  }
  
  ${Media.tablet`
    align-self: flex-start;
    flex-direction: column;
    flex: 0.4;
    
    ${YellowButton}+ ${YellowButton}{
      margin: 5px 0 0;
    }
  `}
`;

export const HeaderRightPanel = HeaderLeftPanel.extend`
  ${Media.tablet`
    flex: 0.33;
  `};
`;

export const TitleWrapper = DivColumn.extend`
  align-items: center;
`;

export const HeaderTitle = styled.div`
  z-index: 1;
  font-size: 33px;
  margin-bottom: 20px;

  ${Media.phonePortrait`
    font-size: 25px;
  `};
`;

export const SubHeader = styled.div`
  font-size: 18px;
  max-width: 500px;
`;

export const SubGreyHeader = SubHeader.extend`
  color: ${Colors.sketchGrey};
`;

export const SubHeaderContainer = DivRow.extend`
  z-index: 1;
  flex: none;
  align-items: center;
  margin-top: 3px;
`;

export const Avatar = styled(NormalAvatar).attrs({
  width: 47,
  height: 44,
})`
  && {
    margin-right: 15px;

    ${Media.tablet`
      margin: 0 0 5px;    
    `};
  }
`;

const options = {
  left: [{ label: 'Home', href: '/home' }, { label: 'Edit Order' }, { label: 'New Order', href: '/order' }],
  right: [
    { label: 'Review' },
    { label: 'Log Out', onClick: AuthRequest.signOut },
    { label: 'Support', href: '/support' },
  ],
};

Header.propTypes = {
  order: PropTypes.object,
  user: PropTypes.object,
};

export default Header;
