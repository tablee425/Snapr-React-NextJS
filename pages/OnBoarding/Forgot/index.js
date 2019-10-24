import React from 'react';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';

import { AuthSession, AuthRequest } from '~/utils/services';
import { AppLayout } from '~/components';
import { prefetchRoute, pushRoute } from '~/utils/utils';
import { openAlertDialog } from '~/utils/redux/actions';

import { ForgotForm } from './Components';

class Forgot extends React.Component {
  onForgot = values => {
    if (!values.recaptcha) {
      throw new SubmissionError({ recaptcha: 'Captcha is not checked' });
    }

    return AuthRequest.forgot(values.email)
      .then(() =>
        this.props.dispatch(
          openAlertDialog({
            description: 'An email with instructions has been sent to your email',
            noAction: () => {
              pushRoute('/login');
            },
          }),
        ),
      )
      .catch(err => {
        throw new SubmissionError({ _error: err.message });
      });
  };

  render() {
    return (
      <AppLayout withForm formTopMargin={60}>
        <ForgotForm onSubmit={this.onForgot} />
      </AppLayout>
    );
  }
}

Forgot.getInitialProps = async ({ ctx }) => AuthRequest.redirectIfAuthenticated(ctx);

Forgot.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(Forgot);
