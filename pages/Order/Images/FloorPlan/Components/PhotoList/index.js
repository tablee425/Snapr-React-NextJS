import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import NormalCheckBox from '@material-ui/core/Checkbox';

import { DivColumn, DivRow, YellowButton, SubmitButton as NormalSubmitButton } from '~/components';
import { arrayBufferToBase64 } from '~/utils/utils';
import { Media } from '~/utils/constants';

const PhotoList = ({ onUploadImage, photo: { imageUrl, preview }, onSubmitImage }) => (
  <Container>
    <MainContent>
      <PhotoWrapper>
        <Photo src={preview || imageUrl}>{preview && <CheckBox checked />}</Photo>

        <YellowButton onChange={onUploadImage} isUpload accept="image/*">
          Upload
        </YellowButton>
      </PhotoWrapper>
    </MainContent>
    <SubmitButton onClick={onSubmitImage}>Upload Edited Image</SubmitButton>
  </Container>
);

const Container = DivColumn.extend`
  margin: 20px 50px 0;

  ${Media.phone`
    margin: 20px 0 0;
  `};
`;

const MainContent = DivRow.extend`
  justify-content: center;
`;

const PhotoWrapper = DivColumn.extend`
  flex: none;
  align-items: center;
  padding: 15px;
  width: 100%;
`;

const Photo = styled.div`
  align-self: stretch;
  display: flex;
  justify-content: flex-end;
  height: 300px;
  margin-bottom: 15px;
  background-image: url(${({ src }) => src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const CheckBox = styled(NormalCheckBox)`
  && {
    pointer-events: none;
    color: white !important;
    background-color: #618833;
    opacity: ${({ checked }) => (checked ? 1 : 0.3)};
  }
`;

const SubmitButton = styled(NormalSubmitButton)`
  && {
    display: none;
    align-self: center;
    margin-top: 40px;
    margin-bottom: 10px;

    ${Media.phone`
      display: block;
    `};
  }
`;

PhotoList.propTypes = {
  photo: PropTypes.object,
  onUploadImage: PropTypes.func,
  onSubmitImage: PropTypes.func,
};

export default PhotoList;
