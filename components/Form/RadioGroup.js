import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { Field } from 'redux-form';
import { RadioGroup as NormalRadioGroup } from 'redux-form-material-ui';

import DivColumn from '../AppLayout/DivColumn';

const renderRadioGroup = ({
  options,
  label,
  containerClasses,
  radioClasses,
  inputClasses,
  errorClasses,
  readonly,
  ...props
}) => {
  const {
    meta: { error, touched },
  } = props;

  const isLabelString = typeof label === 'string' || label instanceof String;

  return (
    <FormControl error={touched && !!error} classes={containerClasses}>
      <InputWrapper isLabelString={isLabelString} style={inputClasses}>
        {isLabelString ? <InputLabel shrink>{label}</InputLabel> : label}

        <NormalRadioGroup {...props}>
          {options.map(option => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio color="primary" />}
              label={option.label}
              classes={radioClasses}
              disabled={readonly}
            />
          ))}
        </NormalRadioGroup>
      </InputWrapper>

      {touched && error && <FormHelperText classes={errorClasses}>{error}</FormHelperText>}
    </FormControl>
  );
};

const RadioGroup = ({ format, ...props }) => <Field {...props} component={renderRadioGroup} />;

const InputWrapper = DivColumn.extend`
  flex: none;
`;

renderRadioGroup.propTypes = {
  label: PropTypes.any,
  meta: PropTypes.object,
  containerClasses: PropTypes.any,
  radioClasses: PropTypes.any,
  inputClasses: PropTypes.any,
  errorClasses: PropTypes.any,
  options: PropTypes.array,
  readonly: PropTypes.bool,
};

RadioGroup.propTypes = {
  format: PropTypes.func,
};

export default RadioGroup;
