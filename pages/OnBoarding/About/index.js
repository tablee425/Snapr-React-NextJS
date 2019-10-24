import React from 'react';
import styled from 'styled-components';

import { AppLayout, DivColumn, DivRow } from '~/components';
import { AuthRequest } from '~/utils/services';
import { Media } from '~/utils/constants';

const About = () => (
  <AppLayout>
    <Container>
      <TextWrapper>
        <Description>
          <b>Snapr ® is a Photography Company.</b>
          <br />
          <br />
          We believe in utilising mobile technology to leverage a shift in the traditional hiring paradigm by
          reinventing the way people book and manage professional photographers.
          <br />
          <br />
          <b>For Clients:</b>
          <br />
          <br />
          Our platform empowers clients to book instantly, communicate transparently, track progress
          throughout and receive everything back the same day.
          <br />
          <br />
          <Light>Clients sign up today via the menu links above:</Light>
          <br />
          <br />
          <b>For Photographers:</b>
          <br />
          <br />
          Our platform empowers professional photographers to receive bookings instantly, communicate
          transparently with clients, provide automatic progress tracking updates throughout the process and a
          free professional photo processing service, so that clients can receive everything back within an
          hour of uploading to the app.
          <br />
          <br />
          <Light>Photographers Download the App below to sign up today:</Light>
        </Description>
        <ImageWrapper>
          <a href="https://itunes.apple.com/us/app/snapr/id1402011547?ls=1&mt=8" target="_blank">
            <ImageButtons src="/static/images/appStore.png" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=uk.co.snapr" target="_blank">
            <ImageButtons src="/static/images/googlePlay.png" />
          </a>
        </ImageWrapper>
      </TextWrapper>
      <img src="/static/images/iPhoneDownload.png" />
    </Container>
  </AppLayout>
);

const Container = styled(DivRow)`
  position: relative;
  align-self: center;
  align-items: center;
  justify-content: center;
  max-width: 847px;
  width: 100%;
  padding: 15px;

  ${Media.phone`
    flex-direction: column;
  `};
`;

const TextWrapper = styled(DivColumn)`
  margin-right: 100px;

  ${Media.phone`
    margin-right: 0;
    margin-bottom: 10px;
  `};
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 19px;
  text-align: justify;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const ImageWrapper = styled(DivRow)`
  margin-top: 20px;

  a + a {
    margin-left: 25px;

    ${Media.phonePortrait`
      margin-left: 0;
    `};
  }

  ${Media.phonePortrait`
    flex-direction: column;
    align-items: center;
  `};
`;

const ImageButtons = styled.img`
  height: 65px;
`;

const Light = styled.span`
  color: #2d2d2d;
  font-style: italic;
  text-shadow: none;
`;

About.getInitialProps = async ({ ctx }) => AuthRequest.redirectIfAuthenticated(ctx);

export default About;
