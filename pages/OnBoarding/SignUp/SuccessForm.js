import React from 'react';
import styled from 'styled-components';

import { AuthSession } from '~/utils/services';
import { AppLayout } from '~/components';

const ThanksForm = () => (
  <AppLayout withForm formTopMargin={100}>
    <Container>
      <b>Congratulations</b>
      <br />
      <br />
      You are now one step closer to becoming part of the Snapr ® community...<br />
      <br />Your application is currently being processed and a confirmation email will be sent to your mail
      account shortly for you to verify your email address.<br />
      <br />
      Thank you for choosing Snapr ® :)
    </Container>
  </AppLayout>
);

const Container = styled.div`
  text-align: center;
  width: 500px;
  margin-bottom: 15px;
  b {
    font-size: 19px;
  }
`;

ThanksForm.getInitialProps = async ({ ctx }) => AuthSession.getEmailSignupMFA(ctx);

export default ThanksForm;
