import React from 'react';
import { Field } from 'redux-form';
import { TextField as NormalTextField } from 'redux-form-material-ui';

const TextField = props => <Field {...props} component={NormalTextField} />;

export default TextField;
