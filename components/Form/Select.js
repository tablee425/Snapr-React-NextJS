import React from 'react';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Field } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import { Select as NormalSelect } from 'redux-form-material-ui';

const renderSelect = ({ containerClasses, labelClasses, shrink, ...props }) => {
  const {
    meta: { touched, error },
  } = props;

  return (
    <FormControl error={touched && !!error} className={containerClasses}>
      <InputLabel shrink={shrink} className={labelClasses}>
        {props.label}
      </InputLabel>

      <NormalSelect {...props}>
        {props.options.map(({ value, label: optionLabel }) => (
          <MenuItem key={value} value={value}>
            {optionLabel}
          </MenuItem>
        ))}
      </NormalSelect>

      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

const Select = props => <Field {...props} component={renderSelect} />;

renderSelect.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.object,
  options: PropTypes.array,
  containerClasses: PropTypes.any,
  labelClasses: PropTypes.any,
  shrink: PropTypes.bool,
};

export default Select;
