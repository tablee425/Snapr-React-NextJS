import React from 'react';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { Field } from 'redux-form';
import NormalPhoneInput from 'react-phone-number-input';
import SmartInput from 'react-phone-number-input/smart-input';

import 'react-phone-number-input/style.css';
import { withStyles } from '@material-ui/core/styles';

import createComponent from '../createComponent';
import './styles.css';

const MaterialPhoneNumber = ({ inputRef, onChange, ...rest }) => (
  <CustomPhoneNumber
    ref={inputRef}
    {...rest}
    onChange={value => onChange({ target: { value } })}
    country="GB"
    inputComponent={SmartInput}
  />
);

const CustomPhoneNumber = createComponent(
  NormalPhoneInput,
  ({ input: { onChange, value, onBlur, ...inputProps }, meta, onChange: ignoredOnChange, ...props }) => ({
    ...props,
    ...inputProps,
    onChange: event => {
      onChange(event || '');
    },
    onBlur,
  }),
);

const styles = {
  input: {
    padding: '1px 0',
  },
};

const renderPhoneNumber = ({ label, classes, ...props }) => {
  const {
    meta: { touched, error },
  } = props;

  return (
    <FormControl error={touched && !!error}>
      <InputLabel shrink>{label}</InputLabel>
      <Input
        inputComponent={MaterialPhoneNumber}
        inputProps={{ ...props }}
        classes={{ input: classes.input }}
      />
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

const PhoneNumber = props => <Field {...props} component={renderPhoneNumber} />;

MaterialPhoneNumber.propTypes = {
  inputRef: PropTypes.func,
  onChange: PropTypes.func,
};

renderPhoneNumber.propTypes = {
  meta: PropTypes.object,
  label: PropTypes.any,
  classes: PropTypes.any,
};

export default withStyles(styles)(PhoneNumber);
