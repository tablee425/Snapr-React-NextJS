import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import { Field } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import createComponent from './createComponent';

const CustomCheckBox = createComponent(
  Checkbox,
  ({
    input: { onChange, value, onBlur, ...inputProps },
    meta,
    onChange: ignoredOnChange,
    defaultChecked,
    ...props
  }) => ({
    ...inputProps,
    ...props,
    checked: value.includes(props.value),
    onChange: event => {
      const arr = [...value];
      if (event.target.checked) {
        arr.push(props.value);
      } else {
        arr.splice(arr.indexOf(props.value), 1);
      }
      onBlur(arr);
      onChange(arr);
    },
  }),
);

const shouldDisableCheckbox = (aryValue, value) => aryValue.length === 20 && aryValue.indexOf(value) < 0;

const renderCheckBoxGroup = ({ label, containerClasses, checkBoxClasses, options, classes, ...props }) => {
  const {
    input: { name, value },
    meta: { touched, error },
  } = props;

  return (
    <FormControl error={touched && !!error} classes={containerClasses}>
      <InputLabel shrink>{label}</InputLabel>

      <FormGroup classes={classes} name={name}>
        {options.map(option => (
          <FormControlLabel
            key={option.value}
            control={
              <CustomCheckBox
                {...props}
                value={option.value}
                name={`${name}-${option.value}`}
                color="primary"
              />
            }
            label={option.label}
            classes={checkBoxClasses}
            disabled={shouldDisableCheckbox(value, option.value)}
          />
        ))}
      </FormGroup>

      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

const CheckBoxGroup = props => <Field {...props} component={renderCheckBoxGroup} />;

renderCheckBoxGroup.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.object,
  options: PropTypes.array,
  containerClasses: PropTypes.object,
  checkBoxClasses: PropTypes.object,
  classes: PropTypes.object,
  input: PropTypes.object,
};

export default CheckBoxGroup;
