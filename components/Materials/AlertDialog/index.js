import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Media } from '~/utils/constants';

const AlertDialog = ({ title, description, noAction, yesAction, noLabel, yesLabel, open }) => (
  <Dialog open={open} onClose={noAction}>
    <DialogWrapper>
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button focusRipple={false} onClick={noAction} color="primary" autoFocus={!yesLabel}>
          {noLabel}
        </Button>
        {yesLabel && (
          <Button focusRipple={false} onClick={yesAction} color="primary" autoFocus>
            {yesLabel}
          </Button>
        )}
      </DialogActions>
    </DialogWrapper>
  </Dialog>
);

const DialogWrapper = styled.div`
  min-width: 350px;

  ${Media.phonePortrait`
    min-width: unset;
  `};
`;

AlertDialog.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  open: PropTypes.bool,
  noAction: PropTypes.func,
  yesAction: PropTypes.func,
  noLabel: PropTypes.string,
  yesLabel: PropTypes.string,
};

export default AlertDialog;
