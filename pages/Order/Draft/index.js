import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { AppLayout, SubmitButton } from '~/components';
import { OrderRequest, AuthRequest } from '~/utils/services';
import { replaceRoute } from '~/utils/utils';
import { openAlertDialog, loadUserSuccess } from '~/utils/redux/actions';
import { makeSelectUser } from '~/utils/redux/selectors';

import { PhotoList, Header } from './Components';

class Draft extends React.Component {
  state = {};

  onSubmit = imageIds => {
    this.setState({ loading: true });
    OrderRequest.requestToEdit(this.props.order.id, imageIds)
      .then(() => replaceRoute(`/order/detail/${this.props.order.id}`))
      .catch(err => this.props.dispatch(openAlertDialog({ description: err.message })))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    return (
      <AppLayout noHeader withLayout>
        <Header order={this.props.order} user={this.props.user} />
        <PhotoList
          photos={this.props.order.freelancerWorksForClient}
          onSubmit={this.onSubmit}
          loading={this.state.loading}
        />
      </AppLayout>
    );
  }
}

Draft.getInitialProps = async ({ ctx }) => {
  const { id } = ctx.query;

  const promises = [];
  promises.push(OrderRequest.getJobDetail(id, ctx));
  if (!ctx.store.getState().global.user) {
    promises.push(AuthRequest.signInWithToken(ctx));
  }

  const [{ detail }, user] = await Promise.all(promises);
  if (detail.freelancerWorksStatus !== 1 && detail.freelancerWorksStatus !== 4) {
    const err = new Error();
    err.code = 'ENOENT';
    throw err;
  }
  if (user) {
    ctx.store.dispatch(loadUserSuccess(user.profile));
  }

  return { order: detail };
};

Draft.propTypes = {
  order: PropTypes.object,
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export default connect(mapStateToProps)(Draft);
