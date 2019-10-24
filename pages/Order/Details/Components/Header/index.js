import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import NoSSR from 'react-no-ssr';

import { YellowButton, DivRow, MobileNav } from '~/components';
import { pushRoute } from '~/utils/utils';
import { AuthRequest } from '~/utils/services';
import { Media } from '~/utils/constants';
import * as Styled from '../../../Download/Components/Header';

const Header = ({ order, user, onPost, loading, onRequestNewUpload }) => {
  const startTime = moment(order.startTime);
  const dateString = startTime.format('HHmm - dddd DD MMMM YYYY');

  options.left[1] = {
    ...options.left[1],
    isHidden: order.status >= 3 || order.reviewPossible,
    href: `/order/${order.id}`,
  };
  options.left[3] = { ...options.left[3], isHidden: order.status !== 0, onClick: onPost, loading };
  options.right[0] = {
    ...options.right[0],
    isHidden: !order.reviewPossible,
    href: `/order/review/${order.id}`,
  };

  return (
    <div>
      <MobileNav menus={[...options.left, ...options.right]} />

      <Styled.HeaderContainer>
        <Styled.TitleWrapper>
          <Styled.HeaderTitle>Order Details</Styled.HeaderTitle>

          <Styled.SubHeaderContainer>
            <Styled.SubHeader>Order #</Styled.SubHeader>
            <Styled.SubHeader style={{ marginLeft: 40 }}>{order.case}</Styled.SubHeader>
          </Styled.SubHeaderContainer>

          <NoSSR>
            <Styled.SubHeader style={{ fontSize: 16 }}>{dateString}</Styled.SubHeader>
          </NoSSR>

          <ButtonWrapper>
            {(order.freelancerWorksStatus === 1 || order.freelancerWorksStatus === 4) && (
              <YellowButton onClick={() => pushRoute(`/order/draft/${order.id}`)}>Draft Photos</YellowButton>
            )}
            {order.downloadPossible && (
              <YellowButton onClick={() => pushRoute(`/order/download/${order.id}`)}>Downloads</YellowButton>
            )}
            {(order.freelancerWorksStatus === 1 || order.freelancerWorksStatus === 4) && (
              <YellowButton onClick={onRequestNewUpload} loading={loading}>
                Request New Upload
              </YellowButton>
            )}
          </ButtonWrapper>
        </Styled.TitleWrapper>

        <Styled.ActionWrapper>
          <Styled.HeaderLeftPanel>
            {options.left.map(
              ({ label, loading: isLoading, isHidden, ...props }) =>
                !isHidden && (
                  <YellowButton key={label} onClick={() => Styled.onHeaderClick(props)} loading={isLoading}>
                    {label}
                  </YellowButton>
                ),
            )}
          </Styled.HeaderLeftPanel>

          <Styled.HeaderRightPanel>
            <Styled.Avatar src={user.avatarLink} />
            {options.right.map(
              ({ label, isHidden, ...props }) =>
                !isHidden && (
                  <YellowButton key={label} onClick={() => Styled.onHeaderClick(props)}>
                    {label}
                  </YellowButton>
                ),
            )}
          </Styled.HeaderRightPanel>
        </Styled.ActionWrapper>
      </Styled.HeaderContainer>
    </div>
  );
};

const ButtonWrapper = DivRow.extend`
  flex: none;
  justify-content: center;
  margin-top: 20px;
  
  ${YellowButton} + ${YellowButton} {
    margin-left: 30px;
  }
  
  ${Media.phonePortrait`
    flex-direction: column;
    ${YellowButton} + ${YellowButton} {
      margin: 5px 0 0;
    }
  `}
`;

const options = {
  left: [
    { label: 'Home', href: '/home' },
    { label: 'Edit Order' },
    { label: 'New Order', href: '/order' },
    { label: 'Post' },
  ],
  right: [
    { label: 'Review' },
    { label: 'Log Out', onClick: AuthRequest.signOut },
    { label: 'Support', href: '/support' },
  ],
};

Header.propTypes = {
  order: PropTypes.object,
  user: PropTypes.object,
  onPost: PropTypes.func,
  loading: PropTypes.bool,
  onRequestNewUpload: PropTypes.func,
};

export default Header;
