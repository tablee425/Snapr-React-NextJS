import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import NormalTextField from '@material-ui/core/TextField';

import { Title, ItemParameter, ItemContainer, Separator as NormalSeparator } from '../EditInfo';

import { checkEmail } from '~/utils/utils';
import { Media } from '~/utils/constants';
import { DivRow, DivColumn, Avatar, YellowButton } from '~/components';

const validate = values => {
  const errors = {};
  const requiredFields = ['agentName', 'agentEmail', 'agentMobile'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  if (values.agentEmail && !checkEmail(values.agentEmail)) {
    errors.agentEmail = 'Invalid Email';
  }

  return errors;
};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <ItemContainer>
    <ItemParameter style={{ marginTop: 1 }}>{label}</ItemParameter>
    <TextField error={touched && !!error} helperText={touched && error} {...input} {...custom} />
  </ItemContainer>
);

const Form = ({ handleSubmit, submitting }) => (
  <FormComp onSubmit={handleSubmit}>
    <Field name="agentName" type="text" component={renderTextField} label="First Name:" />
    <Field name="agentEmail" type="email" component={renderTextField} label="Email:" />
    <Field name="agentMobile" type="text" component={renderTextField} label="Mobile:" />
    <UpdateButton type="submit" loading={submitting}>
      Add Agent
    </UpdateButton>
  </FormComp>
);

const AgentForm = reduxForm({
  form: 'AddAgent',
  validate,
})(Form);

const AddAgent = ({ onSubmit }) => (
  <Container>
    <Title>Add Agents</Title>
    <AgentForm onSubmit={onSubmit} />
    <Separator />
  </Container>
);

const Container = DivColumn.extend`
  align-items: center;
`;

const FormComp = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextField = styled(NormalTextField)`
  && {
    width: 300px;

    ${Media.phone`
      width: 200px;
    `};
  }
`;

const UpdateButton = styled(YellowButton)`
  && {
    align-self: center;
    width: 100px;
    margin-top: 30px;
  }
`;

const Separator = NormalSeparator.extend`
  display: none;

  ${Media.tablet`
    display: block;
  `};
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

AddAgent.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddAgent;
