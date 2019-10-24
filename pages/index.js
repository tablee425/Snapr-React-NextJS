import React from 'react';
import styled from 'styled-components';

import { AppLayout, DivColumn } from '~/components';
import { AuthRequest } from '~/utils/services';

const IndexPage = () => (
  <AppLayout>
    <Container>
      <IFrame
        title="tutorial video"
        src="https://www.youtube.com/embed/2SPRMrOjTN8?autoplay=1?showinfo=0?ecver=2"
        allowFullScreen
      />
    </Container>
  </AppLayout>
);

IndexPage.getInitialProps = async ({ ctx }) => AuthRequest.redirectIfAuthenticated(ctx);

const Container = DivColumn.extend`
  position: relative;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

const IFrame = styled.iframe`
  max-width: 700px;
  width: 100%;
  height: calc(65vw);
  max-height: 450px;
`;

export default IndexPage;
