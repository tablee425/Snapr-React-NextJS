import React from 'react';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';

import { AuthSession, AuthRequest } from '~/utils/services';
import { AppLayout } from '~/components';
import { prefetchRoute, pushRoute } from '~/utils/utils';
import { emailLoginMFA } from '~/utils/constants';
import { userSignOut } from '~/utils/redux/actions';

import { LoginForm } from './Components';

class Login extends React.Component {
  onLogin = values => {
    if (!values.recaptcha) {
      throw new SubmissionError({ recaptcha: 'Captcha is not checked' });
    }

    return AuthRequest.signIn(values.email, values.password)
      .then(data => {
        AuthSession.setMFACookie({ [emailLoginMFA]: values.email });
        pushRoute('/two-factor/login');
      })
      .catch(err => {
        throw new SubmissionError({ _error: err.message });
      });
  };

  render() {
    return (
      <AppLayout withForm formTopMargin={60}>
        <LoginForm onSubmit={this.onLogin} />
      </AppLayout>
    );
  }
}

Login.getInitialProps = async ({ ctx }) => {
  if (ctx.store.getState().global.user) {
    ctx.store.dispatch(userSignOut());
  }
  AuthRequest.redirectIfAuthenticated(ctx);
};

Login.propTypes = {};

export default connect()(Login);
