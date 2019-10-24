import React from 'react';
import { Field } from 'redux-form';
import NormalTimePicker from 'material-ui-pickers/TimePicker';
import styled from 'styled-components';

import createComponent from './createComponent';

const CustomTimePicker = createComponent(
  NormalTimePicker,
  ({ timeFormat, meta: { error }, input, ...props }) => ({
    ...input,
    ...props,
    error: !!error,
    helperText: error,
    format: timeFormat,
  }),
);

const StyledTimePicker = styled(CustomTimePicker)`
  &,
  & * {
    cursor: pointer;
  }
`;

const TimePicker = props => <Field {...props} component={StyledTimePicker} />;

export default TimePicker;
