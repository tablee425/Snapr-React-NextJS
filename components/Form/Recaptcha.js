import React from 'react';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Field } from 'redux-form';
import NormalRecaptcha from 'reaptcha';

import createComponent from './createComponent';

const CustomRecaptcha = createComponent(
  NormalRecaptcha,
  ({ input: { onChange, onBlur, ...inputProps }, meta, ...props }) => ({
    ...inputProps,
    ...props,
    onVerify: () => {
      onBlur('true');
      onChange(true);
    },
    onExpire: () => {
      onBlur('true');
      onChange(false);
    },
  }),
);

class renderRecaptchaField extends React.Component {
  state = {};

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 1500);
  }

  render() {
    const {
      meta: { error },
    } = this.props;

    return (
      <FormControl error={!!error}>
        {this.state.show && (
          <CustomRecaptcha {...this.props} inject={false} sitekey={process.env.CAPTCHA_SITE_KEY} />
        )}
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }
}

const Recaptcha = props => <Field {...props} component={renderRecaptchaField} />;

renderRecaptchaField.propTypes = {
  meta: PropTypes.object,
};

export default Recaptcha;
