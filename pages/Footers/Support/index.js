import React from 'react';
import styled from 'styled-components';

import { AppLayout, DivColumn, DivRow } from '~/components';
import Colors from '~/utils/colors';
import { Media } from '~/utils/constants';
import { AuthRequest } from '~/utils/services';

const Support = () => (
  <AppLayout noHeader>
    <Wrapper>
      <HeaderBlock>
        <HeadText>Snapr ® Support</HeadText>
        <SubHeadText>Discover tips and tricks, find answers to common questions and get help!</SubHeadText>
      </HeaderBlock>
      <Container>
        <SearchWrapper>
          <SearchInput />
          <SearchImage />
        </SearchWrapper>
        <CategoryWrapper>
          <CategoryContainer>
            <CategoryHeader>Contact US</CategoryHeader>
            <QuestionWrapper>
              <Question>
                <Round />I have login issues
              </Question>
              <Question>
                <Round />My Snapr ® app is not working
              </Question>
              <Question>
                <Round />Report a saftey concern
              </Question>
              <Question>
                <Round />I have a general question
              </Question>
              <Question>
                <Round />I have a business concern{' '}
              </Question>
              <Question>
                <Round />I have feedback
              </Question>
            </QuestionWrapper>
          </CategoryContainer>
          <CategoryContainer>
            <CategoryHeader>Troubleshooting</CategoryHeader>
            <QuestionWrapper>
              <Question>
                <Round />I have iOS installing or updating issues
              </Question>
              <Question>
                <Round />I have Android installing or updating issues
              </Question>
              <Question>
                <Round />For Snapr ®’s with jailbroken iPhones
              </Question>
              <Question>
                <Round />My network is blocked
              </Question>
              <Question>
                <Round />Third-party applications and plug-ins
              </Question>
              <Question>
                <Round />Snapr ® FAQs
              </Question>
            </QuestionWrapper>
          </CategoryContainer>
        </CategoryWrapper>

        <Contact>
          <span style={{ color: Colors.grey }}>
            Cannot find what you are looking for? Please get in touch directly via
          </span>
          <br />
          Email: <a href="mailto:support@snapr.co.uk">support@snapr.co.uk</a> Tel: 02074382072
        </Contact>
      </Container>
    </Wrapper>
  </AppLayout>
);

const Wrapper = DivColumn.extend`
  align-items: center;
  background-color: white;
  padding-bottom: 100px;

  ${Media.phone`
    padding: 0 5px 30px;
  `};
`;

const Container = DivColumn.extend`
  align-items: center;
  justify-content: center;
`;

const HeaderBlock = DivColumn.extend`
  background-color: ${Colors.primaryColor};
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding-top: 25px;
  padding-bottom: 45px;
  border-bottom: solid ${Colors.darkGray} 1px;
`;

const HeadText = styled.div`
  font-size: 30px;
  color: ${Colors.black};
`;

const SubHeadText = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 25px;
`;

const SearchWrapper = styled(DivRow)`
  border: solid ${Colors.darkGray} 1px;
  background-color: white;
  border-radius: 18px;
  max-width: 584px;
  width: 100%;
  height: 36px;
  align-items: center;
  justify-content: space-between;
  padding-left: 14px;
  padding-right: 14px;
  margin-top: -20px;
`;

const SearchInput = styled.input.attrs({
  placeholder: 'How can we help?',
})`
  border: none;
  margin-top: 2px;
  height: 24px;
  font-size: 18px;
  width: 100%;
  &:focus {
    outline: 0;
  }
  &::-webkit-input-placeholder {
    font-weight: 300;
    color: ${Colors.placeholderColor};
  }
  &::-moz-placeholder {
    font-weight: 300;
    color: ${Colors.placeholderColor};
  }
  &::-ms-input-placeholder {
    font-weight: 300;
    color: ${Colors.placeholderColor};
  }
  &::-o-input-placeholder {
    font-weight: 300;
    color: ${Colors.placeholderColor};
  }
`;

const SearchImage = styled.img.attrs({
  src: '/static/icons/search.png',
})`
  height: 31px;
`;

const CategoryWrapper = DivColumn.extend`
  max-width: 957px;
  width: 100%;
  padding: 0 5px;

  ${Media.phone`
    padding: 0;
  `};
`;

const CategoryContainer = DivColumn.extend`
  border: solid ${Colors.darkGray} 1px;
  border-radius: 12px;
  padding: 15px 35px;
  margin-top: 100px;

  ${Media.phone`
    margin-top: 20px;
    padding: 10px;
  `};
`;

const QuestionWrapper = styled.div`
  margin-left: 200px;
  display: flex;
  flex-wrap: wrap;
  max-width: 650px;
  width: 100%;
  margin-top: 14px;

  ${Media.phone`
    margin-left: 0;
  `};
`;

const CategoryHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Question = styled.div`
  max-width: 300px;
  width: 100%;
  margin-bottom: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const Round = styled.img.attrs({
  src: '/static/icons/yellowPoint.png',
})`
  height: 16px;
  width: 16px;
  margin-right: 15px;
`;

const Contact = styled.div`
  text-align: center;
  margin-top: 30px;
  align-items: center;
`;

Support.getInitialProps = async ({ ctx }) => AuthRequest.redirectIfUnAuthenticated(ctx);

export default Support;
