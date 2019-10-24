import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';

import { DivRow, DivColumn, Avatar, YellowButton, RightFormControlLabel, Switch } from '~/components';
import { makeSelectUser } from '~/utils/redux/selectors';
import { Media } from '~/utils/constants';
import { Title } from '../EditInfo';

const styles = theme => ({
  switch: {
    fontSize: 19,
  },
});

const validate = values => {
  const errors = {};

  if (!values.emailEnabled && !values.textEnabled) {
    errors.textEnabled = 'One of the notification should be enabled';
    errors.emailEnabled = 'One of the notification should be enabled';
  }

  return errors;
};

const Form = ({ handleSubmit, submitting, classes }) => (
  <FormComp onSubmit={handleSubmit}>
    <Switch name="emailEnabled" label="Email" labelClasses={classes.switch} />
    <Switch name="textEnabled" label="Text" labelClasses={classes.switch} />
    <UpdateButton type="submit" loading={submitting}>
      Update
    </UpdateButton>
  </FormComp>
);

let NotificationForm = reduxForm({ form: 'Notification', validate })(Form);

const mapStateToProps = createStructuredSelector({
  initialValues: makeSelectUser(),
});

NotificationForm = compose(
  withStyles(styles),
  connect(mapStateToProps),
)(NotificationForm);

const Notification = ({ onSubmit }) => (
  <Container>
    <Title>Notifications</Title>
    <NotificationForm onSubmit={onSubmit} />
  </Container>
);

const Container = DivColumn.extend`
  margin-left: 80px;
  align-items: center;

  ${Media.tablet`
    margin: 20px 0 0;
  `};
`;

const FormComp = styled.form`
  display: flex;
  flex-direction: column;
`;

const UpdateButton = styled(YellowButton)`
  && {
    align-self: center;
    width: 100px;
    margin-top: 30px;
  }
`;

Form.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  classes: PropTypes.object,
};

Notification.propTypes = {
  onSubmit: PropTypes.func,
};

export default withStyles(styles)(Notification);
