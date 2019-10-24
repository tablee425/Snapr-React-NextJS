import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NormalRating from 'react-rating';

import { Media } from '~/utils/constants';
import DivRow from '../AppLayout/DivRow';
import DivColumn from '../AppLayout/DivColumn';
import Avatar from '../Materials/Avatar';

export const AvatarPanel = ({ avatarLink, fullName, description, rating, ...rest }) => (
  <AvatarWrapper {...rest}>
    <Avatar src={avatarLink} />
    <TextContainer>
      <Name>{fullName}</Name>
      {description && <Company>{description}</Company>}
      {rating && (
        <RatingWrapper>
          <Rating
            emptySymbol={<Star src="/static/icons/star-empty.png" />}
            fullSymbol={<Star src="/static/icons/star.png" />}
            initialRating={rating}
            readonly
          />
          {rating}
        </RatingWrapper>
      )}
    </TextContainer>
  </AvatarWrapper>
);

const AvatarWrapper = DivRow.extend`
  flex: none;
  justify-content: center;
  align-items: center;
`;

const TextContainer = DivColumn.extend`
  flex: none;
  margin-left: 30px;

  ${Media.phonePortrait`
    margin-left: 10px;
  `};
`;

const Name = styled.div`
  font-size: 19px;
  font-weight: bold;
`;

const Company = styled.div`
  font-size: 14px;
  line-height: 22px;
`;

const RatingWrapper = DivRow.extend`
  align-items: center;
  font-size: 19px;
`;

const Star = styled.img`
  width: 33px;
  height: 33px;
  padding: 3px;
`;

const Rating = styled(NormalRating)`
  height: 33px;
  margin: 0 3px 0 -7px;
`;

AvatarPanel.propTypes = {
  avatarLink: PropTypes.string,
  fullName: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
};

export default styled(AvatarPanel)``;
