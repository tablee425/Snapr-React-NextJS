import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import { TextField, SubmitButton, Recaptcha, ErrorField as NormalErrorField } from '~/components';
import { checkEmail } from '~/utils/utils';
import { Media } from '~/utils/constants';

const validate = values => {
  const errors = {};

  const requiredFields = ['email', 'title', 'description'];
  requiredFields.forEach(field => {
    if (values[field] === null || values[field] === undefined) {
      errors[field] = 'Required';
    }
  });

  if (values.email && !checkEmail(values.email)) {
    errors.email = 'Email is not valid';
  }

  return errors;
};

const Form = props => (
  <FormComp onSubmit={props.handleSubmit}>
    <Title>Contact Us</Title>
    <TextField name="email" type="email" label="EMAIL ADDRESS" className={props.classes.email} />
    <TextField name="title" label="TITLE" className={props.classes.email} />
    <TextField
      name="description"
      label="DESCRIPTION"
      className={props.classes.description}
      multiline
      rows="4"
    />

    <Recaptcha name="recaptcha" />

    <ErrorField error={props.error} />

    <UpdateButton type="submit" loading={props.submitting}>
      Submit
    </UpdateButton>
  </FormComp>
);

const FormComp = styled.form`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  align-items: center;
  padding: 0 20px 10px;

  ${Media.phone`
    padding: 0 0 20px;
  `};
`;

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 10px;

  ${Media.phonePortrait`
    font-size: 25px;
  `};
`;

const UpdateButton = styled(SubmitButton)`
  && {
    width: 150px;
    align-self: center;
    margin-top: 30px;
  }
`;

const ErrorField = NormalErrorField.extend`
  && {
    max-width: 250px;
  }
`;

const styles = {
  email: { marginTop: 10, width: 300, maxWidth: '100%' },
  description: { margin: '10px 0 20px', width: 300, maxWidth: '100%' },
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  classes: PropTypes.object,
  error: PropTypes.string,
};

const ContactForm = reduxForm({ form: 'Contact', validate })(Form);

export default withStyles(styles)(ContactForm);
