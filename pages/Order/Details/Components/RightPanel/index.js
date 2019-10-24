import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Media } from '~/utils/constants';
import { DivColumn, GoogleMap } from '~/components';

import DetailPanel from '../DetailPanel';

const RightPanel = ({ order }) => (
  <Container>
    <DetailPanel order={order} />
    <ItemMap>TRACK YOUR ORDER</ItemMap>
    <GoogleMap address={order.postCode} />
  </Container>
);

const Container = DivColumn.extend`
  align-items: center;
  margin-left: 70px;
  margin-top: 25px;

  ${Media.desktop`
    margin: 20px 0 0;
  `};
`;

const ItemMap = styled.div`
  font-size: 16px;
  margin: 30px 0 20px;
`;

RightPanel.propTypes = {
  order: PropTypes.object,
};

export default RightPanel;
