import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Field } from 'redux-form';
import Rating from 'react-rating';

import { Media } from '~/utils/constants';
import DivColumn from '../AppLayout/DivColumn';
import DivRow from '../AppLayout/DivRow';

const renderRating = ({ label, input, readonly, ...props }) => {
  const {
    meta: { touched, error },
  } = props;

  return (
    <Container className={props.className}>
      <RatingWrapper>
        <Title>{label}</Title>
        <Rating
          emptySymbol={<Star src="/static/icons/star-empty.png" />}
          fullSymbol={<Star src="/static/icons/star.png" />}
          initialRating={parseFloat(input.value)}
          onChange={value => {
            input.onFocus(value);
            input.onBlur(value);
            input.onChange(value);
          }}
          style={{ height: 33 }}
          readonly={readonly}
        />
      </RatingWrapper>
      {touched && error && <FormHelperText error>{error}</FormHelperText>}
    </Container>
  );
};

const RatingField = props => <Field type="number" {...props} component={renderRating} />;

const Container = DivColumn.extend`
  flex: none;
`;

const RatingWrapper = DivRow.extend`
  align-items: center;
  justify-content: space-between;

  ${Media.phone`
    flex-direction: column;
    align-items: flex-start;
  `};
`;

const Star = styled.img`
  width: 33px;
  height: 33px;
  padding: 3px;
`;

const Title = styled.div``;

renderRating.propTypes = {
  meta: PropTypes.object,
  label: PropTypes.string,
  input: PropTypes.object,
  className: PropTypes.string,
  readonly: PropTypes.bool,
};

export default RatingField;
