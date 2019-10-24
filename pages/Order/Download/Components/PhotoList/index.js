import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonBase from '@material-ui/core/ButtonBase';

import { DivColumn, DivRow, YellowButton } from '~/components';
import { OrderRequest } from '~/utils/services';
import { Media } from '~/utils/constants';

const PhotoList = ({
  order: { freelancerWorksForClient, floorPlanImage, epcImage, fpEdited, freelancerWorksStatus },
  onPhotoClick,
  onDownloadAll,
  onDownload,
  loading,
  fpDownloading,
  epcDownloading,
  isiOSInited,
}) => (
  <Container>
    {isiOSInited && (
      <ButtonWrapper>
        {freelancerWorksStatus > 3 && (
          <YellowButton onClick={onDownloadAll} loading={loading}>
            Download All Photos
          </YellowButton>
        )}
        {fpEdited && (
          <YellowButton onClick={() => onDownload('floorPlan')} loading={fpDownloading}>
            Download Floor Plan
          </YellowButton>
        )}
        {epcImage && (
          <YellowButton onClick={() => onDownload('epc')} loading={epcDownloading}>
            Download EPC Chart
          </YellowButton>
        )}
      </ButtonWrapper>
    )}
    <ImageWrapper>
      {epcImage && (
        <FloorImage>
          <PhotoButton
            disableRipple={!epcImage}
            onClick={() => onPhotoClick(epcImage.imageLink, 'epc')}
            src={epcImage.imageThumbnailLink}
          >
            {!epcImage && <PlaceTitle>EPC Chart</PlaceTitle>}
          </PhotoButton>
        </FloorImage>
      )}
      {floorPlanImage && (
        <FloorImage>
          <PhotoButton
            disableRipple={!fpEdited}
            onClick={() => fpEdited && onPhotoClick(floorPlanImage.imageLink, 'floorPlan')}
            src={fpEdited ? floorPlanImage.imageThumbnailLink : '/static/images/placeholder.png'}
          >
            {!fpEdited && <PlaceTitle>Floor Plan</PlaceTitle>}
          </PhotoButton>
        </FloorImage>
      )}
    </ImageWrapper>
    <MainContent>
      {freelancerWorksForClient &&
        freelancerWorksForClient.map(({ imageThumbnailLink, imageLink, imageId }) => (
          <Photo key={imageId}>
            <PhotoButton
              disableRipple={freelancerWorksStatus < 4}
              onClick={() => freelancerWorksStatus > 3 && onPhotoClick(imageLink)}
              src={freelancerWorksStatus > 3 ? imageThumbnailLink : '/static/images/placeholder.png'}
            />
          </Photo>
        ))}
    </MainContent>
  </Container>
);

const Container = DivColumn.extend`
  margin: 20px 70px 0;
  position: relative;

  ${Media.tablet`
    margin: 20px 0 0;
  `};
`;

const ButtonWrapper = DivRow.extend`
  flex: none;
  align-self: center;
  justify-content: center;
  
  ${YellowButton} + ${YellowButton} {
    margin-left: 30px;
  }
  
  ${Media.phonePortrait`
    flex-direction: column;
    ${YellowButton}+ ${YellowButton} {
      margin: 5px 0 0;
    }
  `}
`;

const MainContent = DivRow.extend`
  flex-wrap: wrap;
  margin-top: 15px;
  overflow: scroll;

  ${Media.phone`
    flex-direction: column;
    flex-wrap: nowrap;
    max-height: unset;
    align-items: center;
  `};
`;

const ImageWrapper = DivRow.extend`
  flex: none;
  justify-content: center;
  margin-top: 15px;

  ${Media.phone`
    flex-direction: column;
    align-items: center;
  `};
`;

const Photo = styled.div`
  display: flex;
  width: 33.333333%;
  padding: 15px;

  ${Media.phone`
    width: 100%;
  `};
`;

const FloorImage = Photo.extend`
  width: 40%;
`;

const PhotoButton = styled(ButtonBase)`
  && {
    width: 100%;
    height: 200px;
    background-image: url(${({ src }) => src});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

const PlaceTitle = styled.div`
  font-size: 30px;
`;

PhotoList.propTypes = {
  order: PropTypes.object,
  onPhotoClick: PropTypes.func,
  onDownloadAll: PropTypes.func,
  onDownload: PropTypes.func,
  loading: PropTypes.bool,
  fpDownloading: PropTypes.bool,
  epcDownloading: PropTypes.bool,
  isiOSInited: PropTypes.bool,
};

export default PhotoList;
