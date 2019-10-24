import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import classNames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

import { getRoute, getPDFUrl } from '~/utils/utils';
import { Media } from '~/utils/constants';
import DivRow from '../DivRow';

const styles = theme => ({
  root: {
    width: '100%',
  },
  content: {
    maxWidth: 'unset',
    flexWrap: 'nowrap',
  },
  icon: {
    fontSize: 20,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const PrivacySnackContent = withStyles(styles)(props => {
  const { classes, className, onClose, isAndroidDevice, ...other } = props;
  return (
    <SnackbarContent
      className={classNames(classes.content, className)}
      aria-describedby="client-snackbar"
      message={
        <Message>
          This website uses cookies to provide an optimal user experience.
          <LearnLink href={getPDFUrl('cookie', isAndroidDevice)}>Learn more</LearnLink>
        </Message>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
});

const PrivacySnack = withStyles(styles)(({ open, onClose, classes, isAndroidDevice }) => (
  <Snackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    open={open}
    TransitionComponent={Fade}
    className={classes.root}
  >
    <PrivacySnackContent onClose={onClose} isAndroidDevice={isAndroidDevice} />
  </Snackbar>
));

const Message = DivRow.extend`
  align-items: center;
  ${Media.phonePortrait`
    flex-direction: column;
    align-items: flex-start;
  `};
`;

const LearnLink = styled.a`
  margin-left: 5px;
  text-decoration: underline;
  font-weight: bold;
  color: white;
  white-space: nowrap;

  ${Media.phonePortrait`
    margin-left: 0;
  `};
`;

export default PrivacySnack;
