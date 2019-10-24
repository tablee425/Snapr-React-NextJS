/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { getMinStartDate } from '~/utils/utils';

const selectGlobal = state => state.global;

const makeSelectAlert = () => createSelector(selectGlobal, globalState => globalState.alert);
const makeSelectCommon = () => createSelector(selectGlobal, globalState => globalState.common);
const makeSelectUser = () => createSelector(selectGlobal, globalState => globalState.user);
const makeSelectOrderInfo = () => createSelector(selectGlobal, globalState => globalState.orderInfo);
const makeSelectReview = () => createSelector(selectGlobal, globalState => globalState.review);
const makeSelectOrder = () =>
  createSelector(selectGlobal, ({ order }) => {
    const photographerToBeTaken = { ...order.photographerToBeTaken };

    if (photographerToBeTaken && photographerToBeTaken.type === 1) {
      photographerToBeTaken.specificPhotographers = photographerToBeTaken.specificPhotographers.map(
        ({ key, value }) => key,
      );
    }
    return { ...order, date: order.startTime, photographerToBeTaken };
  });

const makeSelectOrderInfoInitialValues = () =>
  createSelector(selectGlobal, globalState => {
    const minDate = getMinStartDate();
    return {
      date: minDate,
      startTime: minDate,
    };
  });

export {
  makeSelectAlert,
  makeSelectCommon,
  makeSelectOrder,
  makeSelectOrderInfo,
  makeSelectOrderInfoInitialValues,
  makeSelectUser,
  makeSelectReview,
};
