import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import NormalCircularProgress from '@material-ui/core/CircularProgress';

import { openAlertDialog } from '~/utils/redux/actions';
import { AppLayout, DivColumn, DivRow, ErrorField } from '~/components';
import { AuthRequest, AuthSession } from '~/utils/services';
import { replaceRoute, pushRoute, prefetchRoute } from '~/utils/utils';
import { emailLoginMFA, Media } from '~/utils/constants';
import Colors from '~/utils/colors';
import { CodeInput } from './Components';

class MFA extends React.Component {
  state = {};

  onChange = async value => {
    this.setState({ error: null });
    if (value.length === 6) {
      this.setState({ loading: true });
      try {
        const data = await AuthRequest.requestMFA(this.props.email, value, this.props.method === 'signup');

        let route;
        let mfaData;
        if (this.props.method === 'login') {
          prefetchRoute('/home');
          mfaData = { [emailLoginMFA]: null };
          route = '/home';

          AuthSession.setBrowserCookie('token', data.token);
          AuthSession.setMFACookie(mfaData);
        } else if (this.props.method === 'signup') {
          route = '/signup/success';
        }

        replaceRoute(route);
      } catch (err) {
        this.setState({ error: err.message, loading: false });
      }
    }
  };

  onRequestNew = () => {
    this.setState({ loadingRequest: true });
    AuthRequest.requestNewMFA(this.props.email)
      .then(() => this.props.dispatch(openAlertDialog({ description: 'Your request has been submitted' })))
      .catch(err => this.setState({ error: err.message }))
      .finally(() => this.setState({ loadingRequest: false }));
  };

  render() {
    return (
      <AppLayout withForm formTopMargin={60}>
        <Container>
          <Title>Snapr ®</Title>
          <SubTitle>Multi Factor Authentication</SubTitle>
          <CodeInput
            fields={6}
            onChange={this.onChange}
            value={this.state.value}
            disabled={this.state.loading}
            type="number"
          />
          <ErrorField error={this.state.error} />
          <Description>
            Please enter the MFA sent to your registered mobile number. The 2-Step verification code is
            generated for your security.<br />
            <LinkButton onClick={() => pushRoute('/info/mfa')}>More Infomation</LinkButton>
            <br />Not Working?{'\n'}
            <RequestWrapper>
              <RequestButton onClick={this.onRequestNew} loading={this.state.loadingRequest}>
                Request New MFA Code
              </RequestButton>
              {this.state.loadingRequest && <CircularProgress size={30} />}
            </RequestWrapper>
          </Description>
        </Container>
      </AppLayout>
    );
  }
}

const Container = DivColumn.extend`
  position: relative;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.div`
  font-size: 33px;

  ${Media.phonePortrait`
    font-size: 25px;
  `};
`;
const SubTitle = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 19px;
`;
const Description = styled.div`
  color: #898888;
  margin-top: 25px;
  font-size: 15px;
  width: 300px;
  text-align: center;
`;

const RequestWrapper = DivRow.extend`
  position: relative;
  align-items: center;
  justify-content: center;
`;

const LinkButton = styled.div`
  cursor: pointer;
  color: #4a90e2;
  font-weight: bold;
`;

const RequestButton = LinkButton.extend`
  color: ${({ loading }) => (loading ? Colors.sketchGrey : '#4a90e2')};
  pointer-events: ${({ loading }) => (loading ? 'none' : 'unset')};
`;

const CircularProgress = styled(NormalCircularProgress)`
  && {
    position: absolute;
    right: 25px;
  }
`;

MFA.getInitialProps = async ({ ctx }) => {
  let email;

  if (ctx.query.method === 'login') {
    email = await AuthSession.getEmailLoginMFA(ctx);
  } else if (ctx.query.method === 'signup') {
    email = await AuthSession.getEmailSignupMFA(ctx);
  }

  return { email, method: ctx.query.method };
};

MFA.propTypes = {
  email: PropTypes.string,
  dispatch: PropTypes.func,
  method: PropTypes.string,
};

export default connect()(MFA);
