import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import NormalCheckBox from '@material-ui/core/Checkbox';

import { DivColumn, DivRow, YellowButton, SubmitButton as NormalSubmitButton } from '~/components';
import { arrayBufferToBase64 } from '~/utils/utils';
import { Media } from '~/utils/constants';

const PhotoList = ({ onUploadImage, photos, onSubmitImages }) => (
  <Container>
    <MainContent>
      {_.map(photos, ({ imageUrl, preview }, imageKey) => (
        <PhotoWrapper key={imageKey}>
          <Photo src={preview || imageUrl}>{preview && <CheckBox checked value={imageKey} />}</Photo>

          <YellowButton onChange={e => onUploadImage(imageKey, e)} isUpload accept="image/*">
            Upload
          </YellowButton>
        </PhotoWrapper>
      ))}
    </MainContent>
    <SubmitButton onClick={onSubmitImages}>Upload Edited Images</SubmitButton>
  </Container>
);

const Container = DivColumn.extend`
  margin: 20px 50px 0;
`;

const MainContent = DivRow.extend`
  flex-wrap: wrap;
  max-height: 480px;
  overflow: scroll;

  ${Media.phone`
    flex-direction: column;
    flex-wrap: nowrap;
    max-height: unset;
  `};
`;

const PhotoWrapper = DivColumn.extend`
  flex: none;
  align-items: center;
  width: 33.333333%;
  padding: 15px;

  ${Media.phone`
    width: 100%;
  `};
`;

const Photo = styled.div`
  align-self: stretch;
  display: flex;
  justify-content: flex-end;
  height: 200px;
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
  photos: PropTypes.object,
  onUploadImage: PropTypes.func,
  onSubmitImages: PropTypes.func,
};

export default PhotoList;
