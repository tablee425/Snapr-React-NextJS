import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Checkbox as NormalCheckBox } from 'redux-form-material-ui';
import { Field } from 'redux-form';

const renderCheckBox = ({ label, meta: { touched, error }, containerClasses, ...props }) => (
  <FormControl error={touched && !!error} className={containerClasses}>
    <FormControlLabel control={<NormalCheckBox {...props} color="primary" />} label={label} />
    {touched && error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);

const CheckBox = props => <Field {...props} component={renderCheckBox} />;

renderCheckBox.propTypes = {
  label: PropTypes.any,
  containerClasses: PropTypes.any,
  meta: PropTypes.object,
  // input: PropTypes.object,
};

export default CheckBox;
