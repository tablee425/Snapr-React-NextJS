import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import NormalTextField from '@material-ui/core/TextField';

import { Title, Separator } from '../EditInfo';

import { checkPass } from '~/utils/utils';
import { Media } from '~/utils/constants';
import { DivRow, DivColumn, Avatar, YellowButton } from '~/components';

const validate = values => {
  const errors = {};
  const requiredFields = ['currentPassword', 'newPassword', 'confirmPassword'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    } else if (values[field].length < 8) {
      errors[field] = 'Must be more than 8 length';
    } else if (!checkPass(values[field])) {
      errors[field] = 'Invalid Password';
    }
  });

  const { newPassword, confirmPassword } = values;
  if (newPassword && confirmPassword && newPassword !== confirmPassword) {
    errors.confirmPassword = 'Confirm Password should be equal with Password';
  }

  return errors;
};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField error={touched && !!error} label={label} helperText={touched && error} {...input} {...custom} />
);

const Form = ({ handleSubmit, submitting }) => (
  <FormComp onSubmit={handleSubmit}>
    <Field name="currentPassword" type="password" component={renderTextField} label="Current Password" />
    <Field name="newPassword" type="password" component={renderTextField} label="New Password" />
    <Field name="confirmPassword" type="password" component={renderTextField} label="Confirm New Password" />
    <UpdateButton type="submit" loading={submitting}>
      Update
    </UpdateButton>
  </FormComp>
);

const PasswordForm = reduxForm({
  form: 'PasswordForm',
  validate,
})(Form);

const ChangePassword = ({ onSubmit }) => (
  <Container>
    <Title>Change Password</Title>
    <PasswordForm onSubmit={onSubmit} />
    <Separator />
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

const TextField = styled(NormalTextField)`
  && {
    width: 300px;
    margin-top: 10px;
  }
`;

const UpdateButton = styled(YellowButton)`
  && {
    align-self: center;
    width: 100px;
    margin-top: 35px;
  }
`;

renderTextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

ChangePassword.propTypes = {
  onSubmit: PropTypes.func,
};

export default ChangePassword;
