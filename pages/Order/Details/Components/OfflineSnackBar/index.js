import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import ErrorIcon from '@material-ui/icons/Error';

import { getRoute } from '~/utils/utils';

const styles1 = theme => ({
  content: {
    backgroundColor: '#d32f2f',
    maxWidth: 'unset',
  },
  icon: {
    fontSize: 23,
    marginRight: 10,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 18,
  },
});

const OfflineSnackContent = withStyles(styles1)(props => {
  const { classes, className, onClose, ...other } = props;
  return (
    <SnackbarContent
      className={classNames(classes.content, className)}
      message={
        <span className={classes.message}>
          <ErrorIcon className={classes.icon} />
          Disconnected
        </span>
      }
      {...other}
    />
  );
});

const OfflineSnack = ({ open, onClose }) => (
  <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} TransitionComponent={Fade}>
    <OfflineSnackContent onClose={onClose} />
  </Snackbar>
);

const LearnLink = styled.a`
  margin-left: 5px;
  cursor: pointer;
  text-decoration: underline;
  font-weight: bold;
  color: white;
`;

OfflineSnackContent.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
};

OfflineSnack.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default OfflineSnack;
