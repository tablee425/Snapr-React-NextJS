import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NormalCircularProgress from '@material-ui/core/CircularProgress';

import Colors from '~/utils/colors';

const YellowButton = ({ children, loading, isUpload, onChange, accept, disabled, className, ...rest }) => (
  <MuiThemeProvider theme={theme}>
    <ButtonWrapper className={className}>
      <Button
        focusRipple={false}
        variant="contained"
        color="secondary"
        disabled={disabled || loading}
        component={isUpload ? 'label' : undefined}
        {...rest}
      >
        {children}
        {isUpload && <input onChange={onChange} style={{ display: 'none' }} type="file" accept={accept} />}
      </Button>
      {loading && <CircularProgress size={20} />}
    </ButtonWrapper>
  </MuiThemeProvider>
);

const theme = createMuiTheme({
  typography: {
    fontFamily: "'CustomSkia', 'Skia'",
  },
  palette: {
    secondary: {
      main: Colors.primaryColor,
      dark: '#f0f067',
    },
    action: {
      disabled: '#ffff67',
    },
  },
  shadows: Array(25).fill('none'),
  overrides: {
    MuiButton: {
      root: {
        minWidth: 0,
        minHeight: 0,
        height: 26,
        textTransform: 'unset',
        fontWeight: 'normal',
        padding: '1px 11px 0',
        borderRadius: 9,
        border: '1px solid #979797',
      },
      label: {
        fontSize: 14,
        color: '#919090',
        lineHeight: '12px',
        whiteSpace: 'nowrap',
      },
    },
    MuiTouchRipple: {
      child: {
        opacity: 0.3,
      },
      '@keyframes mui-ripple-exit': {
        '0%': {
          opacity: 0.3,
        },
        '100%': {
          opacity: 0,
        },
      },
    },
  },
});

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CircularProgress = styled(NormalCircularProgress)`
  && {
    position: absolute;
  }
`;

YellowButton.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  isUpload: PropTypes.bool,
  onChange: PropTypes.func,
  accept: PropTypes.string,
  className: PropTypes.any,
};

export default styled(YellowButton)``;
