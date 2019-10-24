import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AppLayout, ProgressBar } from '~/components';
import { EditorRequest } from '~/utils/services';
import { replaceRoute, downloadImages, downloadImage } from '~/utils/utils';
import { openAlertDialog } from '~/utils/redux/actions';

import { PhotoList, Header } from './Components';

class FloorPlan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: { imageUrl: props.image },
      percentCompleted: -1,
    };
  }

  onSubmitImage = () => {
    if (!this.state.image.preview) {
      this.props.dispatch(openAlertDialog({ description: 'You should upload image' }));
      return;
    }

    this.setState({ percentCompleted: 0 });
    const files = [
      {
        key: this.props.imageId,
        file: this.state.image.uploadedFile,
        name: this.state.image.uploadedFile.name,
      },
    ];

    EditorRequest.uploadFloorPlan(this.props.jobId, this.props.imageId, files, this.onUploadProgress)
      .then(() => {
        this.setState({ percentCompleted: -1 }, () => {
          this.props.dispatch(openAlertDialog({ description: 'Uploaded successfully!' }));
        });
      })
      .catch(err => {
        this.setState({ percentCompleted: -1 }, () => {
          this.props.dispatch(openAlertDialog({ description: err.message }));
        });
      });
  };

  onUploadProgress = progressEvent => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    this.setState({ percentCompleted });
  };

  onDownload = async () => {
    downloadImage(this.state.image.imageUrl);
  };

  onUploadImage = e => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        const { image } = this.state;
        image.uploadedFile = file;
        image.preview = reader.result;
        this.setState({ image });
      };
      reader.readAsDataURL(file);
    }
  };

  render() {
    return (
      <div>
        <AppLayout noHeader withLayout>
          <Header
            id={this.props.jobNumber}
            onDownload={this.onDownload}
            onSubmitImage={this.onSubmitImage}
            note={this.props.note}
          />
          <PhotoList
            photo={this.state.image}
            onUploadImage={this.onUploadImage}
            onSubmitImage={this.onSubmitImage}
          />
        </AppLayout>
        <ProgressBar percent={this.state.percentCompleted} />
      </div>
    );
  }
}

FloorPlan.getInitialProps = async ({ ctx }) => {
  const { jobId, imageId } = ctx.query;
  const { image, case: jobNumber, note } = await EditorRequest.getFloorPlan(jobId, imageId);
  return { image, jobId, imageId, jobNumber, note };
};

FloorPlan.propTypes = {
  image: PropTypes.any,
  jobNumber: PropTypes.any,
  jobId: PropTypes.string,
  imageId: PropTypes.string,
  dispatch: PropTypes.func,
  note: PropTypes.string,
};

export default connect()(FloorPlan);
