import React from 'react';
import { SubmissionError } from 'redux-form';

import { AuthSession, AuthRequest } from '~/utils/services';
import { checkEmail, checkPass, pushRoute } from '~/utils/utils';
import { emailSignupMFA } from '~/utils/constants';
import { AppLayout } from '~/components';

import { SignUpForm } from './Components';

class SignUp extends React.Component {
  onSignUp = values => {
    if (!values.recaptcha) {
      throw new SubmissionError({ recaptcha: 'Captcha is not checked' });
    }

    return AuthRequest.signUp(values)
      .then(data => {
        AuthSession.setMFACookie({ [emailSignupMFA]: values.email });
        pushRoute('/two-factor/signup');
      })
      .catch(err => {
        throw new SubmissionError({ _error: err.message });
      });
  };

  render() {
    return (
      <AppLayout withForm formTopMargin={20}>
        <SignUpForm onSubmit={this.onSignUp} />
      </AppLayout>
    );
  }
}

SignUp.getInitialProps = async ({ ctx }) => AuthRequest.redirectIfAuthenticated(ctx);

export default SignUp;
