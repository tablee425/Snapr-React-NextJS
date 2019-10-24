import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NormalButton from '@material-ui/core/Button';
import NormalCircularProgress from '@material-ui/core/CircularProgress';

// import NormalButton from './Button';
//
// const Button = NormalButton.extend`
//   align-self: center;
//   background-color: ${props => (props.disabled ? Colors.lightGrey : Colors.blue)};
//   color: ${props => (props.penColor ? props.penColor : 'white')};
//   height: 42px;
//   min-width: 135px;
//   border-radius: 21px;
//   font-size: 18px;
//   font-family: 'CustomSkia', 'Skia';
//   margin-top: 10px;
//   padding-left: 20px;
//   padding-right: 20px;
//
//   &:focus,
//   &:active {
//     opacity: ${props => (!props.disabled && !props.submitting ? '0.7 !important' : '1 !important')};
//   }
// `;

const SubmitButton = ({ children, loading, disabled, ...rest }) => (
  <Button
    focusRipple={false}
    variant="contained"
    color="primary"
    {...rest}
    disabled={disabled}
    loading={loading ? 'true' : 'false'}
  >
    {children}
    {loading && <CircularProgress size={20} />}
  </Button>
);

const Button = styled(NormalButton)`
  && {
    color: white !important;
    font-size: 17px;
    padding: 9px 35px 6px;
    border-radius: 20px;
    pointer-events: ${({ loading }) => (loading === 'true' ? 'none' : 'auto')};
    text-transform: unset;
  }
`;

const CircularProgress = styled(NormalCircularProgress)`
  && {
    position: absolute;
    right: 9px;
    bottom: 9px;
    color: white !important;
  }
`;

SubmitButton.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default SubmitButton;
