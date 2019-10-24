import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DivRow, DivColumn, YellowButton } from '~/components';
import { AuthRequest } from '~/utils/services';
import { pushRoute } from '~/utils/utils';
import { Media } from '~/utils/constants';

import * as Styled from '../../../../Download/Components/Header';

const Header = ({ id, onDownload, onSubmitImage, note }) => (
  <Styled.HeaderContainer>
    <Styled.TitleWrapper>
      <Styled.HeaderTitle>FloorPlan for Editing</Styled.HeaderTitle>

      <Styled.SubHeaderContainer>
        <Styled.SubHeader>Order #</Styled.SubHeader>
        <Styled.SubHeader style={{ marginLeft: 40 }}>{id}</Styled.SubHeader>
      </Styled.SubHeaderContainer>

      {note && (
        <Styled.SubHeaderContainer>
          <Styled.SubHeader>Note</Styled.SubHeader>
          <Styled.SubHeader style={{ marginLeft: 30 }}>{note}</Styled.SubHeader>
        </Styled.SubHeaderContainer>
      )}

      <ButtonWrapper>
        <YellowButton onClick={onDownload}>Download</YellowButton>
      </ButtonWrapper>
    </Styled.TitleWrapper>

    <Styled.ActionWrapper>
      <HeaderLeftPanel>
        <YellowButton onClick={onSubmitImage}>Upload Edited Image</YellowButton>
      </HeaderLeftPanel>

      <Styled.HeaderRightPanel />
    </Styled.ActionWrapper>
  </Styled.HeaderContainer>
);

const HeaderLeftPanel = Styled.HeaderLeftPanel.extend`
  ${Media.tablet`
    align-items: flex-start;
  `}
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

Header.propTypes = {
  id: PropTypes.string,
  onDownload: PropTypes.func,
  onSubmitImage: PropTypes.func,
  note: PropTypes.string,
};

export default Header;
