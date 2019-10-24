import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Field } from 'redux-form';

import { DivColumn } from '~/components';

const renderMultilineText = ({ label, input, classes, readonly, ...props }) => {
  const {
    meta: { touched, error },
  } = props;

  return (
    <DivColumn>
      <Label shrink>{label}</Label>
      <AdditionalInput {...input} {...props} readOnly={!!readonly} />
      {touched && error && <FormHelperText error>{error}</FormHelperText>}
    </DivColumn>
  );
};

const MultilineText = props => <Field {...props} component={renderMultilineText} />;

const Label = styled.div``;

const AdditionalInput = styled.textarea`
  padding: 7px;
  resize: none;
  font-size: 16px;
  border: 1px solid black;
`;

renderMultilineText.propTypes = {
  meta: PropTypes.object,
  label: PropTypes.any,
  classes: PropTypes.any,
  input: PropTypes.object,
  readonly: PropTypes.bool,
};

export default MultilineText;
