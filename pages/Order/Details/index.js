import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { OrderRequest, AuthSession, AuthRequest, FreelancerRequest } from '~/utils/services';
import { AppLayout, DivRow, YellowButton } from '~/components';
import { makeSelectUser, makeSelectCommon } from '~/utils/redux/selectors';
import { openAlertDialog, loadUserSuccess } from '~/utils/redux/actions';
import { Media } from '~/utils/constants';

import { Header, LeftPanel, RightPanel, OfflineSnackBar } from './Components';

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = { order: props.order, isSocketConnected: true };
  }

  onRequestNewUpload = () => {
    this.setState({ loading: true });
    OrderRequest.requestNewUpload(this.state.order.id)
      .then(({ freelancerWorksStatus }) => {
        this.props.dispatch(
          openAlertDialog({ description: 'Your request has been successfully submitted!' }),
        );
        const { order } = this.state;
        this.setState({ order: { ...order, freelancerWorksStatus } });
      })
      .catch(err => {
        this.props.dispatch(openAlertDialog({ description: err.message }));
      })
      .finally(() => this.setState({ loading: false }));
  };

  onPost = () => {
    this.setState({ loading: true });
    OrderRequest.postJob(this.state.order.id)
      .then(({ job: { status, freelancerWorksStatus } }) => {
        this.props.dispatch(openAlertDialog({ description: 'The order has been posted successfully!' }));
        const { order } = this.state;
        this.setState({ order: { ...order, status, freelancerWorksStatus } });
      })
      .catch(err => this.props.dispatch(openAlertDialog({ description: err.message })))
      .finally(() => this.setState({ loading: false }));
  };

  onSocketConnect = isSocketConnected => {
    this.setState({ isSocketConnected });
  };

  render() {
    return (
      <AppLayout noHeader withLayout>
        <Header
          order={this.state.order}
          user={this.props.user}
          onPost={this.onPost}
          loading={this.state.loading}
          onRequestNewUpload={this.onRequestNewUpload}
        />

        <MainContent>
          <LeftPanel
            freelancer={this.props.freelancer}
            chatHistory={this.props.chatHistory}
            loadMore={this.props.loadMore}
            token={this.props.token}
            jobId={this.props.order.id}
            user={this.props.user}
            socket={this.props.socket}
            onSocketConnect={this.onSocketConnect}
            isOnline={this.props.common.isOnline}
          />
          <RightPanel order={this.state.order} />
        </MainContent>
        <OfflineSnackBar open={!this.props.common.isOnline || !this.state.isSocketConnected} />
      </AppLayout>
    );
  }
}

export const MainContent = DivRow.extend`
  margin-bottom: 24px;

  ${Media.desktop`
    flex-direction: column-reverse;
    align-items: center;
  `};
`;

Details.getInitialProps = async ({ ctx }) => {
  const id = ctx.query && ctx.query.id;

  const promises = [];
  promises.push(FreelancerRequest.getChatHistory(id, ctx));
  if (!ctx.store.getState().global.user) {
    promises.push(AuthRequest.signInWithToken(ctx));
  }

  const [{ jobDetails, freelancer, chatHistory, loadMore }, user] = await Promise.all(promises);
  if (user) {
    ctx.store.dispatch(loadUserSuccess(user.profile));
  }
  const token = AuthSession.getToken(ctx);
  return { order: jobDetails, freelancer, chatHistory, loadMore, token };
};

Details.propTypes = {
  order: PropTypes.object,
  user: PropTypes.object,
  dispatch: PropTypes.func,
  freelancer: PropTypes.object,
  chatHistory: PropTypes.array,
  loadMore: PropTypes.bool,
  token: PropTypes.string,
  socket: PropTypes.object,
  common: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  common: makeSelectCommon(),
});

export default connect(mapStateToProps)(Details);
