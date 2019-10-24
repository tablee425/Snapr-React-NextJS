import React from 'react';
import PropTypes from 'prop-types';
import { DivRow, DivColumn, Avatar, YellowButton, AvatarPanel as NormalAvatarPanel } from '~/components';
import { Media } from '~/utils/constants';

const AvatarPanel = ({ user, onUpcomingJobs, showUpcoming }) => (
  <Container>
    <NormalAvatarPanel avatarLink={user.avatarLink} fullName={user.fullName} description={user.companyName} />
    {showUpcoming && (
      <YellowButton onClick={onUpcomingJobs} style={{ marginTop: 20 }}>
        Upcoming Jobs
      </YellowButton>
    )}
  </Container>
);

const Container = DivColumn.extend`
  flex: none;
  align-items: center;
  margin-top: 30px;

  ${Media.phone`
    margin-top: 10px;
  `};
`;

AvatarPanel.propTypes = {
  user: PropTypes.any,
  onUpcomingJobs: PropTypes.func,
  showUpcoming: PropTypes.bool,
};

export default AvatarPanel;
