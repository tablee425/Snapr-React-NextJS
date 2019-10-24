import { call, put, takeLatest } from 'redux-saga/effects';
import { OrderRequest, AuthRequest } from '~/utils/services';

import { actionTypes, failure } from './actions';

// function* loadOrderData(action) {
//   try {
//     const response = yield call(OrderRequest.getJobDetail, action.payload.id, action.payload.ctx);
//     yield put(loadOrderSuccess(response.detail));
//   } catch (err) {
//     yield put(failure(err));
//   }
// }

export default function*() {
  // yield takeLatest(actionTypes.ORDER_LOAD, loadOrderData);
}
