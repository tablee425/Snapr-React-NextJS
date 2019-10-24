import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
import MobileDetect from 'mobile-detect';
import { createStructuredSelector } from 'reselect';

import { AppLayout } from '~/components';
import { OrderRequest, AuthRequest } from '~/utils/services';
import { makeSelectUser, makeSelectCommon } from '~/utils/redux/selectors';
import { loadUserSuccess, openAlertDialog } from '~/utils/redux/actions';
import { arrayBufferToBase64, downloadImages, replaceRoute, downloadImage, getRoute } from '~/utils/utils';

import { IndividualPhoto, PhotoList, Header } from './Components';

class Download extends React.Component {
  constructor(props) {
    super(props);

    this.state = { order: props.order };
  }

  componentDidMount() {
    const md = new MobileDetect(window.navigator.userAgent);
    if (md.os() === 'iOS') {
      OrderRequest.getJobDetail(Router.router.query.id).then(({ detail }) => {
        this.setState({ order: detail, isiOSInited: true });
      });
    } else {
      this.setState({ isiOSInited: true });
    }
  }

  onDownloadAll = () => {
    if (this.state.order.reviewPossible) {
      this.downloadAllImage();
    } else {
      const isFPDownloaded =
        this.state.order.product.indexOf('Floor Plan') < 0 || this.state.order.fpDownloaded;
      const isEPCDownloaded = this.state.order.product.indexOf('EPC') < 0 || this.state.order.epcDownloaded;

      if (isFPDownloaded && isEPCDownloaded) {
        this.props.dispatch(
          openAlertDialog({
            description:
              'By proceeding with this download you are confirming that you are happy with these images and that you will be prompted to review your Snapr ® experience. Would you like to continue?',
            noLabel: 'No',
            yesLabel: 'Yes',
            yesAction: async () => {
              this.downloadAllImage();
            },
          }),
        );
      } else {
        this.downloadAllImage();
      }
    }
  };

  onDownload = status => {
    if (this.state.order.reviewPossible) {
      this.downloadImage(status);
    } else {
      const isFPDownloaded =
        status === 'floorPlan' ||
        this.state.order.product.indexOf('Floor Plan') < 0 ||
        this.state.order.fpDownloaded;
      const isEPCDownloaded =
        status === 'epc' || this.state.order.product.indexOf('EPC') < 0 || this.state.order.epcDownloaded;
      const isNormalDownloaded =
        (status !== 'epc' && status !== 'floorPlan') ||
        this.state.order.product.indexOf('Photography') < 0 ||
        this.state.order.freelancerWorksStatus === 5;

      if (isFPDownloaded && isEPCDownloaded && isNormalDownloaded) {
        this.props.dispatch(
          openAlertDialog({
            description:
              'By proceeding with this download you are confirming that you are happy with these images and that you will be prompted to review your Snapr ® experience. Would you like to continue?',
            noLabel: 'No',
            yesLabel: 'Yes',
            yesAction: async () => {
              this.downloadImage(status);
            },
          }),
        );
      } else {
        this.downloadImage(status);
      }
    }
  };

  downloadImage = async individualStatus => {
    const { order } = this.state;
    if (individualStatus === 'floorPlan') {
      if (this.props.common.isiOSDevice) {
        if (!order.fpDownloaded) {
          this.setState({ isFPDownloading: true });
          const { fpDownloaded, reviewPossible } = await OrderRequest.downloadFloorPlan(this.state.order.id);
          this.setState({ order: { ...order, fpDownloaded, reviewPossible } });
        }
        downloadImage(this.state.order.floorPlanImage.imageLink);
      } else {
        downloadImage(this.state.order.floorPlanImage.imageLink);
        if (!order.fpDownloaded) {
          const { fpDownloaded, reviewPossible } = await OrderRequest.downloadFloorPlan(this.state.order.id);
          this.setState({ order: { ...order, fpDownloaded, reviewPossible } });
        }
      }
    } else if (individualStatus === 'epc') {
      if (this.props.common.isiOSDevice) {
        if (!order.epcDownloaded) {
          this.setState({ isEPCDownloading: true });
          const { epcDownloaded, reviewPossible } = await OrderRequest.downloadEPC(this.state.order.id);
          this.setState({ order: { ...order, epcDownloaded, reviewPossible } });
        }
        downloadImage(this.state.order.epcImage.imageLink);
      } else {
        downloadImage(this.state.order.epcImage.imageLink);
        if (!order.epcDownloaded) {
          const { epcDownloaded, reviewPossible } = await OrderRequest.downloadEPC(this.state.order.id);
          this.setState({ order: { ...order, epcDownloaded, reviewPossible } });
        }
      }
    } else if (!individualStatus) {
      if (this.props.common.isiOSDevice) {
        if (this.state.order.freelancerWorksStatus !== 5) {
          this.setState({ isDownloading: true });
          const { status, freelancerWorksStatus, reviewPossible } = await OrderRequest.downloadJob(
            this.state.order.id,
          );
          this.setState({ order: { ...order, status, freelancerWorksStatus, reviewPossible } });
        }
        downloadImage(this.state.individualPhoto);
      } else {
        downloadImage(this.state.individualPhoto);
        if (this.state.order.freelancerWorksStatus !== 5) {
          const { status, freelancerWorksStatus, reviewPossible } = await OrderRequest.downloadJob(
            this.state.order.id,
          );
          this.setState({ order: { ...order, status, freelancerWorksStatus, reviewPossible } });
        }
      }
    }
  };

  downloadAllImage = async () => {
    this.setState({ isDownloadAll: true });
    if (this.state.order.freelancerWorksStatus !== 5) {
      if (!this.props.common.isiOSDevice) {
        await downloadImages(this.state.order.freelancerWorksForClient.map(({ imageLink }) => imageLink));
      }
      const { status, freelancerWorksStatus, reviewPossible } = await OrderRequest.downloadJob(
        this.state.order.id,
      );
      const { order } = this.state;
      if (this.props.common.isiOSDevice) {
        this.setState({
          order: { ...order, status, freelancerWorksStatus, reviewPossible },
        });
        await downloadImages(this.state.order.freelancerWorksForClient.map(({ imageLink }) => imageLink));
      } else {
        this.setState({
          isDownloadAll: false,
          order: { ...order, status, freelancerWorksStatus, reviewPossible },
        });
      }
    } else {
      await downloadImages(this.state.order.freelancerWorksForClient.map(({ imageLink }) => imageLink));
      this.setState({ isDownloadAll: false });
    }
  };

  onPhotoClick = (photo, status) => {
    this.setState({ isIndividual: true, individualPhoto: photo, individualStatus: status });
  };

  onRequestFPEdit = value => {
    if (!value) {
      this.props.dispatch(openAlertDialog({ description: 'Please input notes' }));
      return;
    }
    this.setState({ requesting: true });
    OrderRequest.requestToEditFP(this.state.order.id, value)
      .then(({ fpEdited }) => {
        const { order } = this.state;
        this.setState({ order: { ...order, fpEdited } });
        this.props.dispatch(
          openAlertDialog({
            description: 'Your request has been successfully submitted!',
            noAction: () => {
              this.setState({ isIndividual: false });
            },
          }),
        );
      })
      .catch(err => {
        this.props.dispatch(openAlertDialog({ description: err.message }));
      })
      .finally(() => this.setState({ requesting: false }));
  };

  render() {
    return (
      <AppLayout noHeader withLayout>
        <Header order={this.state.order} user={this.props.user} />
        {!this.state.isIndividual ? (
          <PhotoList
            order={this.state.order}
            onPhotoClick={this.onPhotoClick}
            loading={this.state.isDownloadAll}
            fpDownloading={this.state.isFPDownloading}
            epcDownloading={this.state.isEPCDownloading}
            onDownloadAll={this.onDownloadAll}
            onDownload={this.onDownload}
            isiOSInited={this.state.isiOSInited}
          />
        ) : (
          <IndividualPhoto
            onRequestFPEdit={this.onRequestFPEdit}
            reviewPossible={this.state.order.reviewPossible}
            photo={this.state.individualPhoto}
            loading={this.state.isDownloading || this.state.isFPDownloading || this.state.isEPCDownloading}
            status={this.state.individualStatus}
            onBack={() => this.setState({ isIndividual: false })}
            onDownload={this.onDownload}
            requesting={this.state.requesting}
          />
        )}
      </AppLayout>
    );
  }
}

Download.getInitialProps = async ({ ctx }) => {
  const { id } = ctx.query;

  const promises = [];
  promises.push(OrderRequest.getJobDetail(id, ctx));
  if (!ctx.store.getState().global.user) {
    promises.push(AuthRequest.signInWithToken(ctx));
  }

  const [{ detail }, user] = await Promise.all(promises);
  if (!detail.downloadPossible) {
    const err = new Error();
    err.code = 'ENOENT';
    throw err;
  }
  if (user) {
    ctx.store.dispatch(loadUserSuccess(user.profile));
  }

  return { order: detail };
};

Download.propTypes = {
  order: PropTypes.object,
  user: PropTypes.object,
  dispatch: PropTypes.func,
  common: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  common: makeSelectCommon(),
});

export default connect(mapStateToProps)(Download);
