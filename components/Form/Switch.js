import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Field } from 'redux-form';
import styled from 'styled-components';
import NormalSwitch from '@material-ui/core/Switch';

import { Media } from '~/utils/constants';
import RightFormControlLabel from '../Materials/RightFormControlLabel';
import createComponent from './createComponent';

const CustomSwitch = createComponent(
  NormalSwitch,
  ({ input: { onChange, onBlur, value, ...inputProps }, checked, meta, ...props }) => ({
    ...inputProps,
    ...props,
    checked: !!value,
    onChange: event => {
      onBlur(event);
      onChange(event);
    },
  }),
);

const renderSwitch = ({ label, meta: { touched, error }, labelClasses, ...props }) => (
  <FormControl error={touched && !!error}>
    <SwitchLabel
      control={<CustomSwitch {...props} color="secondary" />}
      label={label}
      classes={{ label: labelClasses }}
    />
    {touched && error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);

const CheckBox = props => <Field {...props} component={renderSwitch} />;

const SwitchLabel = styled(RightFormControlLabel)`
  && {
    width: 350px;
    margin-top: 15px;
    justify-content: space-between;
    border-bottom: 1px solid #979797;

    ${Media.phone`
      width: 300px;
    `};
  }
`;

renderSwitch.propTypes = {
  label: PropTypes.any,
  labelClasses: PropTypes.any,
  meta: PropTypes.object,
};

export default CheckBox;
