import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DivRow, DivColumn, YellowButton } from '~/components';
import Colors from '~/utils/colors';
import { Media } from '~/utils/constants';

class StatusHeader extends React.Component {
  state = {};

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    if (this.props.status === 'epc') {
      return (
        <EpcHeader>
          Please Note: you can find your Full EPC report on the EPC central register at{' '}
          <a href="https://www.epcregister.com/reportSearchAddressByPostcode.html">
            https://www.epcregister.com/reportSearchAddressByPostcode.html
          </a>{' '}
          by entering the full post code of the property and selecting the right address.
        </EpcHeader>
      );
    }
    if (this.props.status === 'floorPlan' && !this.props.reviewPossible) {
      return (
        <FPHeader>
          <EditInput
            value={this.state.value}
            rows={2}
            placeholder="Edit Notes..."
            onChange={this.handleChange}
          />
          <YellowButton
            onClick={() => this.props.onRequestFPEdit(this.state.value)}
            loading={this.props.requesting}
          >
            Request Floorplan Edit
          </YellowButton>
        </FPHeader>
      );
    }
    return null;
  }
}

const IndividualPhoto = ({
  photo,
  onBack,
  loading,
  onDownload,
  status,
  reviewPossible,
  onRequestFPEdit,
  requesting,
}) => (
  <Container>
    <StatusHeader
      status={status}
      reviewPossible={reviewPossible}
      onRequestFPEdit={onRequestFPEdit}
      requesting={requesting}
    />
    <Photo src={photo} />
    <ButtonWrapper>
      <YellowButton onClick={onBack}>Back</YellowButton>
      <YellowButton onClick={() => onDownload(status)} loading={loading}>
        Download
      </YellowButton>
    </ButtonWrapper>
  </Container>
);

const Container = DivColumn.extend`
  position: relative;
  align-items: center;
  margin: 20px 0 20px;
`;

const ButtonWrapper = DivRow.extend`
  margin-top: 30px;
  ${YellowButton} + ${YellowButton} {
    margin-left: 30px;
  }
`;

const Photo = styled.img`
  margin-top: 15px;
  max-width: 100%;
  pointer-events: none;
`;

const EpcHeader = styled.div`
  width: 500px;
  max-width: 100%;

  a {
    word-break: break-all;
  }
`;

const FPHeader = DivColumn.extend`
  align-items: center;
`;

const EditInput = styled.textarea`
  margin-bottom: 10px;
  font-size: 17px;
  padding: 9px 13px;
  width: 400px;
  border: solid 1px ${Colors.grey};
  border-radius: 15px;
  resize: none;

  ${Media.phonePortrait`
    width: 250px;
  `};
`;

StatusHeader.propTypes = {
  status: PropTypes.string,
  reviewPossible: PropTypes.bool,
  onRequestFPEdit: PropTypes.func,
  requesting: PropTypes.bool,
};

IndividualPhoto.propTypes = {
  photo: PropTypes.string,
  onBack: PropTypes.func,
  loading: PropTypes.bool,
  onDownload: PropTypes.func,
  status: PropTypes.string,
  reviewPossible: PropTypes.bool,
  onRequestFPEdit: PropTypes.func,
  requesting: PropTypes.bool,
};

export default IndividualPhoto;
