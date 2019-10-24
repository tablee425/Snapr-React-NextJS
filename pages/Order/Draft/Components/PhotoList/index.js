import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NormalCheckBox from '@material-ui/core/Checkbox';
import _ from 'lodash';

import { DivColumn, DivRow, YellowButton, SubmitButton as NormalSubmitButton } from '~/components';
import { arrayBufferToBase64 } from '~/utils/utils';
import { Media } from '~/utils/constants';

class PhotoList extends React.Component {
  state = { selectedIds: {} };

  onSelect = (imageId, imageType) => {
    const { selectedIds } = this.state;

    if (!selectedIds[imageId]) {
      selectedIds[imageId] = { isChecked: true, imageType };
    } else {
      selectedIds[imageId].isChecked = !selectedIds[imageId].isChecked;
    }
    this.setState({ selectedIds });
  };

  onSubmit = () => {
    const { selectedIds } = this.state;
    this.props.onSubmit(
      _.reduce(
        selectedIds,
        (result, { isChecked, imageType }, key) => {
          if (isChecked) {
            result.push({ imageId: key, imageType });
          }
          return result;
        },
        [],
      ),
    );
  };

  hasCheckedImage = () => _.find(this.state.selectedIds, value => value.isChecked);

  render() {
    return (
      <Container>
        <MainContent>
          {this.props.photos.map(({ imageId, imageThumbnailLink, imageType }) => (
            <PhotoWrapper key={imageId}>
              <Photo src={imageThumbnailLink}>
                <CheckBox
                  checked={!!(this.state.selectedIds[imageId] && this.state.selectedIds[imageId].isChecked)}
                  value={imageId}
                  color="primary"
                />
              </Photo>
              <YellowButton onClick={() => this.onSelect(imageId, imageType)}>
                {this.state.selectedIds[imageId] && this.state.selectedIds[imageId].isChecked ? 'Uns' : 'S'}elect
                for Editing
              </YellowButton>
            </PhotoWrapper>
          ))}
        </MainContent>
        <SubmitButton onClick={this.onSubmit} disabled={!this.hasCheckedImage()} loading={this.props.loading}>
          Start Editing
        </SubmitButton>
      </Container>
    );
  }
}

const Container = DivColumn.extend`
  position: relative;
`;

const MainContent = DivRow.extend`
  flex-wrap: wrap;
  max-height: 480px;
  overflow: scroll;
  margin-top: 20px;

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
    align-self: center;
    margin-top: 40px;
    margin-bottom: 10px;
  }
`;

PhotoList.propTypes = {
  photos: PropTypes.array,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

export default PhotoList;
