import React from 'react';
import { Field } from 'redux-form';
import NormalDatePicker from 'material-ui-pickers/DatePicker';
import styled from 'styled-components';

import createComponent from './createComponent';

const CustomDatePicker = createComponent(NormalDatePicker, ({ meta: { error }, input, ...props }) => ({
  ...input,
  ...props,
  error: !!error,
  helperText: error,
}));

const StyledDatePicker = styled(CustomDatePicker)`
  &,
  & * {
    cursor: pointer;
  }
`;

const DatePicker = props => <Field {...props} component={StyledDatePicker} />;

export default DatePicker;
