import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import dynamic from 'next/dynamic';

import Colors from '~/utils/colors';
import DivColumn from '../AppLayout/DivColumn';

const styles = {
  root: {
    height: 14,
    borderRadius: 7,
  },
};

const AriaModal = dynamic(import('react-aria-modal'), { ssr: false });

const ProgressBar = ({ percent, classes }) => (
  <AriaModal
    titleText="ProgressBar"
    mounted={percent > -1}
    initialFocus="#title"
    verticallyCenter
    underlayStyle={{ cursor: 'default' }}
  >
    <DialogWrapper>
      <Container>
        <Label id="title">Uploading... {percent}%</Label>
        <LinearProgress variant="determinate" value={percent} className={classes.root} />
      </Container>
    </DialogWrapper>
  </AriaModal>
);

const DialogWrapper = DivColumn.extend`
  padding: 0 5px;
`;

const Container = DivColumn.extend`
  width: 700px;
  max-width: 100%;
  padding: 25px;
  background-color: white;
`;

const Label = styled.div`
  text-align: center;
  font-size: 22px;
  margin-bottom: 15px;
`;

ProgressBar.propTypes = {
  classes: PropTypes.object,
  percent: PropTypes.number,
};

export default withStyles(styles)(ProgressBar);
