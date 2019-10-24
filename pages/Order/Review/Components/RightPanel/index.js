import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DivRow, DivColumn } from '~/components';
import { Media } from '~/utils/constants';
import DetailPanel from '../../../Details/Components/DetailPanel';

const RightPanel = ({ order }) => (
  <Container>
    <DetailPanel order={order} />
    {order.freelancerWorksForClient && (
      <ImgWrapper>
        {order.freelancerWorksForClient.map(({ imageId, imageThumbnailLink }) => (
          <PhotoWrapper key={imageId}>
            <Photo src={imageThumbnailLink} />
          </PhotoWrapper>
        ))}
      </ImgWrapper>
    )}
  </Container>
);

const Container = DivColumn.extend`
  margin-top: 10px;
  margin-left: 70px;

  ${Media.phone`
    margin-left: 0;
  `};
`;

const ImgWrapper = DivRow.extend`
  overflow: scroll;
  flex-wrap: wrap;
  margin-top: 10px;
  height: 300px;
`;

const PhotoWrapper = styled.div`
  width: 33.333333%;
  height: 130px;
  padding: 5px;

  ${Media.phone`
    width: 100%;
  `};
`;

const Photo = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${({ src }) => src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

RightPanel.propTypes = {
  order: PropTypes.object,
};

export default RightPanel;
