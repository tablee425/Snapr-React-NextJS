import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { isValidNumber } from 'libphonenumber-js';

import { OrderRequest } from '~/utils/services';
import { Media } from '~/utils/constants';
import {
  TextField,
  SubmitButton,
  Recaptcha as NormalRecaptcha,
  CheckBox,
  PhoneNumber,
  DivRow,
  ErrorField,
} from '~/components';
import { checkEmail, checkPass, getRoute, getPDFUrl } from '~/utils/utils';
import { makeSelectCommon } from '~/utils/redux/selectors';

const validate = values => {
  const errors = {};

  const requiredFields = [
    'firstName',
    'lastName',
    'phoneNumber',
    'postCode',
    'companyName',
    'email',
    'password',
    'confirmPassword',
    'agree',
  ];
  requiredFields.forEach(field => {
    if (values[field] === null || values[field] === undefined) {
      errors[field] = 'Required';
    } else if (field === 'email' && !checkEmail(values[field])) {
      errors[field] = 'Email is not valid';
    } else if (field === 'password' && values[field].length < 8) {
      errors[field] = 'Must be more than 8 length';
    } else if (field === 'password' && !checkPass(values[field])) {
      errors[field] = 'Password is not valid';
    } else if (field === 'confirmPassword' && values[field] !== values.password) {
      errors[field] = 'Confirm Password should be equal with Password';
    } else if (field === 'phoneNumber' && !isValidNumber(values[field])) {
      errors[field] = 'Mobile Number is invalid';
    }
  });

  return errors;
};

const Form = props => (
  <FormComp onSubmit={props.handleSubmit}>
    <Title>Sign up with Snapr ®</Title>

    <RowWrapper>
      <TextField name="firstName" label="FIRST NAME" className={props.classes.firstName} />
      <TextField name="lastName" label="LAST NAME" className={props.classes.firstName} />
    </RowWrapper>
    <RowWrapper>
      <PhoneNumber name="phoneNumber" label="MOBILE NUMBER" className={props.classes.firstName} />
      <TextField name="postCode" label="POST CODE" className={props.classes.firstName} />
    </RowWrapper>
    <RowWrapper>
      <TextField name="companyName" label="COMPANY NAME" fullWidth />
    </RowWrapper>

    <RowWrapper>
      <TextField name="email" type="email" label="EMAIL" fullWidth />
    </RowWrapper>
    <RowWrapper>
      <TextField name="password" type="password" label="PASSWORD" fullWidth />
    </RowWrapper>
    <RowWrapper>
      <TextField name="confirmPassword" type="password" label="CONFIRM PASSWORD" fullWidth />
    </RowWrapper>

    <Recaptcha name="recaptcha" />

    <CheckBox
      name="agree"
      label={
        <div>
          <span> I agree to the </span>
          <a href={getPDFUrl('termCondition', props.common.isAndroidDevice)}>Terms of Use</a>
          <span> & </span>
          <a href={getPDFUrl('privacy', props.common.isAndroidDevice)}>Privacy Policy</a>
        </div>
      }
      containerClasses={props.classes.agree}
    />

    <ErrorField error={props.error} />

    <UpdateButton type="submit" loading={props.submitting}>
      Sign Up
    </UpdateButton>
  </FormComp>
);

const FormComp = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  align-self: stretch;
  padding: 0 20px 10px;

  ${Media.phone`
    padding: 0 0 20px;
  `};
`;

const Title = styled.div`
  font-size: 30px;

  ${Media.phonePortrait`
    font-size: 25px;
  `};
`;

const RowWrapper = DivRow.extend`
  width: 500px;
  justify-content: space-between;
  margin-top: 15px;

  ${Media.phone`
    flex-direction: column;
    width: 100%;
  `};
`;

const Recaptcha = styled(NormalRecaptcha)`
  margin-top: 15px;
`;

const UpdateButton = styled(SubmitButton)`
  && {
    width: 150px;
    align-self: center;
    margin-top: 30px;
  }
`;

const styles = {
  firstName: {
    width: 240,
    '@media (max-width: 768px)': {
      width: 500,
      maxWidth: '100%',
    },
  },
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  classes: PropTypes.object,
  error: PropTypes.string,
  common: PropTypes.object,
};

const SignUpForm = reduxForm({ form: 'SignUp', validate })(Form);

const mapStateToProps = createStructuredSelector({
  common: makeSelectCommon(),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(SignUpForm);
