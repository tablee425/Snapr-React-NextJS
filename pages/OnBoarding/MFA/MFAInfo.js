import React from 'react';
import styled from 'styled-components';

import { DivColumn, AppLayout } from '~/components';

const MFAInfo = () => (
  <AppLayout withForm formTopMargin={60}>
    <Container>
      <Title>MFA Info</Title>
      <Description>
        Multi-Factor Authentication (MFA) is a simple best practice that adds an extra layer of protection on
        top of your user name and password. With MFA enabled, when a user signs into the Snapr ® App, they will
        be prompted for their user name and password (the first factor—what they know), as well as for an
        authentication code from their MFA mobile device (the second factor—what they have). Taken together,
        these multiple factors provide increased security for your Snapr ® account settings and resources.
      </Description>
    </Container>
  </AppLayout>
);

const Container = DivColumn.extend`
  align-items: center;
  margin: 0 20px 15px;
`;

const Title = styled.div`
  font-size: 25px;
`;
const Description = styled.div`
  color: #898888;
  margin-top: 25px;
  font-size: 15px;
  width: 350px;
  text-align: justify;
`;

export default MFAInfo;
