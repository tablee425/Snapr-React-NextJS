import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import styled from 'styled-components';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';

import { TextField, SubmitButton, Recaptcha, ErrorField as NormalErrorField } from '~/components';
import { checkEmail, checkPass, getRoute } from '~/utils/utils';
import Colors from '~/utils/colors';
import { Media } from '~/utils/constants';

const validate = values => {
  const errors = {};

  const requiredFields = ['email', 'password'];
  requiredFields.forEach(field => {
    if (values[field] === null || values[field] === undefined) {
      errors[field] = 'Required';
    }
  });

  if (values.email && !checkEmail(values.email)) {
    errors.email = 'Email is not valid';
  }
  if (values.password) {
    if (values.password.length < 8) {
      errors.password = 'Must be more than 8 length';
    } else if (!checkPass(values.password)) {
      errors.password = 'Password is not valid';
    }
  }

  return errors;
};

const Form = props => (
  <FormComp onSubmit={props.handleSubmit}>
    <Title>Snapr ® Client Platform</Title>
    <SubTitle>Please log in</SubTitle>

    <TextField name="email" type="email" label="EMAIL ADDRESS" className={props.classes.email} />
    <TextField name="password" type="password" label="PASSWORD" className={props.classes.password} />

    <Recaptcha name="recaptcha" />

    <ErrorField error={props.error} />

    <UpdateButton type="submit" loading={props.submitting}>
      Log in
    </UpdateButton>

    <LinkWrapper>
      <Link href={getRoute('/forgot')} as="/forgot">
        <a>FORGOT PASSWORD </a>
      </Link>
      /
      <Link href={getRoute('/signup')} as="/signup">
        <a> CREATE ACCOUNT</a>
      </Link>
    </LinkWrapper>
  </FormComp>
);

const FormComp = styled.form`
  display: flex;
  position: relative;
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
  text-align: center;

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
    width: 150px;
    align-self: center;
    margin-top: 30px;
  }
`;

const LinkWrapper = styled.div`
  margin-top: 10px;
  & a {
    font-size: 12px;
    text-decoration: none;
    color: ${Colors.termBlue};
    font-family: 'CustomSkia', 'Skia';
  }
`;

const ErrorField = NormalErrorField.extend`
  && {
    max-width: 250px;
  }
`;

const styles = {
  email: { margin: '15px 0', width: 256 },
  password: { marginBottom: 15, width: 256 },
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  classes: PropTypes.object,
  error: PropTypes.string,
};

const LoginForm = reduxForm({ form: 'Login', validate })(Form);

export default withStyles(styles)(LoginForm);
