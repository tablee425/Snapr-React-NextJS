import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { OrderRequest, FreelancerRequest, AuthRequest } from '~/utils/services';
import { AppLayout, DivRow } from '~/components';
import { replaceRoute } from '~/utils/utils';
import { Media } from '~/utils/constants';
import { openAlertDialog, loadUserSuccess, loadReviewSuccess } from '~/utils/redux/actions';
import { makeSelectUser } from '~/utils/redux/selectors';

import { Header, LeftPanel, RightPanel } from './Components';

class Review extends React.Component {
  onReview = values =>
    OrderRequest.reviewJob({ ...values, id: this.props.order.id })
      .then(({ reviewJobIds }) => {
        this.props.dispatch(
          openAlertDialog({
            description: 'Your review has been submitted successfully!',
            noAction: () => {
              this.props.dispatch(loadReviewSuccess(false));

              if (reviewJobIds.length === 0) {
                replaceRoute(`/home`);
              } else {
                replaceRoute(`/order/review/${reviewJobIds[0]}`);
              }
            },
          }),
        );
      })
      .catch(err => this.props.dispatch(openAlertDialog({ description: err.message })));

  render() {
    return (
      <AppLayout noHeader withLayout>
        <Header
          order={this.props.order}
          user={this.props.user}
          navigatePossible={!this.props.reviewJobIds || this.props.reviewJobIds.length === 0}
        />

        <MainContent>
          <LeftPanel
            freelancer={this.props.freelancer}
            onSubmit={this.onReview}
            isReviewed={!!this.props.order.reviewToFreelancer}
          />
          <RightPanel order={this.props.order} />
        </MainContent>
      </AppLayout>
    );
  }
}

export const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 20px;
  padding-bottom: 24px;

  ${Media.desktop`
    flex-direction: column;
    align-items: center;
  `};
`;

Review.getInitialProps = async ({ ctx }) => {
  const { id } = ctx.query;
  const promises = [];
  promises.push(OrderRequest.getJobDetail(id, ctx));
  promises.push(FreelancerRequest.getFreelancerInfo(id, ctx));
  if (!ctx.store.getState().global.user) {
    promises.push(AuthRequest.reviewSignIn(ctx));
  }

  const [{ detail }, { freelancer_profile }, user] = await Promise.all(promises); // eslint-disable-line camelcase

  if (!detail.reviewPossible && !detail.reviewToFreelancer) {
    const err = new Error();
    err.code = 'ENOENT';
    throw err;
  }

  if (user) {
    ctx.store.dispatch(loadUserSuccess(user.profile));
  }
  if (detail.reviewToFreelancer) {
    ctx.store.dispatch(loadReviewSuccess(detail.reviewToFreelancer));
  }
  return { order: detail, freelancer: freelancer_profile, reviewJobIds: user && user.reviewJobIds };
};

Review.propTypes = {
  order: PropTypes.object,
  freelancer: PropTypes.object,
  dispatch: PropTypes.func,
  user: PropTypes.object,
  reviewJobIds: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export default connect(mapStateToProps)(Review);
