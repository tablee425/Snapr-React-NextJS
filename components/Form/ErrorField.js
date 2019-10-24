import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FormHelperText from '@material-ui/core/FormHelperText';

const ErrorField = ({ error, ...rest }) =>
  error ? (
    <ErrorText error {...rest}>
      {error}
    </ErrorText>
  ) : null;

const ErrorText = styled(FormHelperText)`
  && {
    text-align: center;
    max-width: 400px;
    font-size: 16px;
  }
`;

ErrorField.propTypes = {
  error: PropTypes.string,
};

export default styled(ErrorField)``;
