import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import moment from 'moment';

import { AppLayout } from '~/components';
import { OrderRequest, AuthRequest } from '~/utils/services';
import {
  loadUserSuccess,
  loadOrderSuccess,
  loadOrderInfoSuccess,
  openAlertDialog,
} from '~/utils/redux/actions';
import { replaceRoute } from '~/utils/utils';

import { HeaderTitle } from '../Download/Components/Header';
import { OrderForm } from './Components';

class OrderEdit extends React.Component {
  state = {};

  onSubmit = (values, isDraft) => {
    if (isDraft) {
      this.setState({ secondLoading: true });
    } else {
      this.setState({ firstLoading: true });
    }

    let { keyCollectionAddress, photographerToBeTaken } = values;

    const startTime = moment(values.date).set({
      hour: moment(values.startTime).hours(),
      minute: moment(values.startTime).minutes(),
      second: moment(values.startTime).seconds(),
    });
    if ((!values.status || values.status < 1) && startTime.isBefore(moment())) {
      this.setState({ firstLoading: false, secondLoading: false });
      throw new SubmissionError({ startTime: 'Should be after current time' });
    }

    if (values.access !== 'Key Collection') {
      keyCollectionAddress = undefined;
    }
    if (values.product.indexOf('Photography') < 0) {
      photographerToBeTaken = undefined;
    } else if (photographerToBeTaken && photographerToBeTaken.type !== 1) {
      photographerToBeTaken.specificPhotographers = undefined;
    }

    const filteredParams = { ...values, keyCollectionAddress, photographerToBeTaken, startTime };

    let promise;
    if (this.props.isEditMode) {
      promise = OrderRequest.editJob(filteredParams);
    } else {
      promise = OrderRequest.createJob(filteredParams, isDraft);
    }

    return promise
      .then(({ jobId }) => {
        replaceRoute(`/home`);
      })
      .catch(err => {
        this.props.dispatch(openAlertDialog({ description: err.message }));
        this.setState({ firstLoading: false, secondLoading: false });
      });
  };

  render() {
    return (
      <AppLayout noHeader withForm>
        <HeaderTitle>{`${this.props.isEditMode ? 'Edit ' : ''}Order with Snapr ®`}</HeaderTitle>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <OrderForm
            onSubmit={this.onSubmit}
            isEditMode={this.props.isEditMode}
            firstLoading={this.state.firstLoading}
            secondLoading={this.state.secondLoading}
          />
        </MuiPickersUtilsProvider>
      </AppLayout>
    );
  }
}

OrderEdit.getInitialProps = async ({ ctx }) => {
  const id = ctx.query && ctx.query.id;
  const promises = [];
  if (id) {
    promises.push(OrderRequest.getJobDetail(id, ctx));
  } else {
    promises.push(OrderRequest.getOrderInfo(ctx));
  }

  if (!ctx.store.getState().global.user) {
    promises.push(AuthRequest.signInWithToken(ctx));
  }

  const [response, user] = await Promise.all(promises);

  if (user) {
    ctx.store.dispatch(loadUserSuccess(user.profile));
  }
  if (id) {
    ctx.store.dispatch(loadOrderSuccess(response.detail));
  } else {
    ctx.store.dispatch(loadOrderInfoSuccess(response));
  }

  return { isEditMode: !!id };
};

OrderEdit.propTypes = {
  isEditMode: PropTypes.bool,
  dispatch: PropTypes.func,
};

export default connect()(OrderEdit);
