import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { AppLayout, ProgressBar } from '~/components';
import { EditorRequest } from '~/utils/services';
import { replaceRoute, downloadImages } from '~/utils/utils';
import { openAlertDialog } from '~/utils/redux/actions';

import { PhotoList, Header } from './Components';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: _.mapValues(_.keyBy(props.images, 'imageKey'), ({ imageUrl }) => ({ imageUrl })),
      percentCompleted: -1,
    };
  }

  onSubmitImages = () => {
    if (_.find(this.state.images, image => !image.preview)) {
      this.props.dispatch(openAlertDialog({ description: 'You should upload all images' }));
      return;
    }

    this.setState({ percentCompleted: 0 });
    const files = _.map(this.state.images, ({ uploadedFile }, key) => ({
      key,
      file: uploadedFile,
      name: uploadedFile.name,
    }));

    EditorRequest.uploadEditorImages(this.props.id, files, this.onUploadProgress)
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

  onDownloadAll = async () => {
    this.setState({ isDownloading: true });
    setTimeout(async () => {
      await downloadImages(this.props.images.map(({ imageUrl }) => imageUrl));
      this.setState({ isDownloading: false });
    }, 200);
  };

  onUploadImage = (key, e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        const { images } = this.state;
        images[key].uploadedFile = file;
        images[key].preview = reader.result;
        this.setState({ images });
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
            onDownloadAll={this.onDownloadAll}
            onSubmitImages={this.onSubmitImages}
            isDownloading={this.state.isDownloading}
            note={this.props.note}
          />
          <PhotoList
            photos={this.state.images}
            onUploadImage={this.onUploadImage}
            onSubmitImages={this.onSubmitImages}
          />
        </AppLayout>
        <ProgressBar percent={this.state.percentCompleted} />
      </div>
    );
  }
}

Edit.getInitialProps = async ({ ctx }) => {
  const { id } = ctx.query;
  const { images, jobNumber, note } = await EditorRequest.getEditorImages(id);
  return { images, id, jobNumber, note };
};

Edit.propTypes = {
  images: PropTypes.any,
  jobNumber: PropTypes.any,
  id: PropTypes.string,
  note: PropTypes.string,
  dispatch: PropTypes.func,
};

export default connect()(Edit);
