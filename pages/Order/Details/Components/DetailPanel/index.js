import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';

import Colors from '~/utils/colors';
import { Media } from '~/utils/constants';
import { DivRow, DivColumn, GoogleMap } from '~/components';

export const renderField = (label, description, isFull) => (
  <ItemContainer style={isFull && { width: '100%' }}>
    <ItemParameter>{label}</ItemParameter>

    {Object.prototype.toString.call(description) === '[object Array]' ? (
      <DivColumn>{description.map(item => <ItemValue key={item}>{item}</ItemValue>)}</DivColumn>
    ) : (
      <ItemValue>{description}</ItemValue>
    )}
  </ItemContainer>
);

const DetailPanel = ({ order }) => {
  const agent = _.find(order.clients, ({ id }) => id === order.agent).name;
  return (
    <InfoOrder>
      {renderField('Agent', agent)}
      {renderField('Address', order.address)}
      {renderField('Post Code', order.postCode)}
      {renderField('Access', order.access)}
      {order.keyCollectionAddress && renderField('Keys', order.keyCollectionAddress)}
      {renderField('Product', order.product)}
      {renderField('Bedrooms', order.bedrooms)}
      {renderField('Furnishing', order.furnishing === 0 ? 'Unfurnished' : 'Furnished')}
      {renderField('Property', order.property)}
      {order.product.indexOf('Photography') > -1 &&
        renderField(
          'Photos',
          order.photographerToBeTaken.type === 0
            ? 'PhotographersChoice'
            : order.photographerToBeTaken.specificPhotographers.map(item => item.value).join(', '),
          true,
        )}
      {order.notes && renderField('Notes', order.notes, true)}
    </InfoOrder>
  );
};

const InfoOrder = DivRow.extend`
  flex: none;
  align-self: stretch;
  justify-content: space-between;
  flex-wrap: wrap;

  ${Media.desktop`
    align-self: center;
    width: 80%;
  `};

  ${Media.phone`
    width: 100%;
  `};
`;

const ItemContainer = DivRow.extend`
  flex: none;
  width: 48%;
  margin-top: 5px;

  ${Media.phonePortrait`
    width: 100%;
  `};
`;

const ItemParameter = styled.div`
  width: 100px;
  font-size: 18px;
`;

const ItemValue = styled.div`
  flex: 1;
  color: ${Colors.sketchGrey};
  font-size: 18px;
`;

DetailPanel.propTypes = {
  order: PropTypes.object,
};

export default DetailPanel;
