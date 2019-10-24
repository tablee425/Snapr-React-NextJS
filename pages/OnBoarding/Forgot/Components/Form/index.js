import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import { OrderRequest } from '~/utils/services';
import { TextField, SubmitButton, Recaptcha, ErrorField } from '~/components';
import { checkEmail, checkPass } from '~/utils/utils';
import { Media } from '~/utils/constants';

const validate = values => {
  const errors = {};

  const requiredFields = ['email'];
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
    <Title>Snapr ®</Title>
    <SubTitle>Reset your password</SubTitle>

    <TextField name="email" type="email" label="EMAIL ADDRESS" className={props.classes.email} />

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
  align-items: center;
  align-self: stretch;
  padding: 0 20px 10px;

  ${Media.phone`
    padding: 0;
  `};
`;

const Title = styled.div`
  font-size: 30px;

  ${Media.phonePortrait`
    font-size: 25px;
  `};
`;

const SubTitle = styled.div`
  margin-top: 30px;
  font-size: 14px;
`;

const UpdateButton = styled(SubmitButton)`
  && {
    width: 200px;
    align-self: center;
    margin-top: 30px;
  }
`;

const styles = {
  email: { margin: '15px 0', width: 256 },
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  classes: PropTypes.object,
  error: PropTypes.string,
};

const ForgotForm = reduxForm({ form: 'Forgot', validate })(Form);

export default withStyles(styles)(ForgotForm);
