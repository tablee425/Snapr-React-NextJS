export const actionTypes = {
  ALERT_OPEN: 'ALERT_OPEN',
  ALERT_CLOSE: 'ALERT_CLOSE',
  SET_COMMON: 'SET_COMMON',

  FAILURE: 'FAILURE',
  ORDER_LOAD_SUCCESS: 'ORDER_LOAD_SUCCESS',
  REVIEW_LOAD_SUCCESS: 'REVIEW_LOAD_SUCCESS',
  ORDER_INFO_LOAD_SUCCESS: 'ORDER_INFO_LOAD_SUCCESS',
  USER_LOAD_SUCCESS: 'USER_LOAD_SUCCESS',
  USER_SIGN_OUT: 'USER_SIGN_OUT',
};

export const openAlertDialog = ({
  description,
  title = 'Snapr ®',
  noLabel = 'Ok',
  yesLabel,
  noAction,
  yesAction,
}) => ({
  type: actionTypes.ALERT_OPEN,
  payload: { description, title, noLabel, yesLabel, noAction, yesAction },
});
export const closeAlertDialog = () => ({ type: actionTypes.ALERT_CLOSE });
export const setCommon = payload => ({
  type: actionTypes.SET_COMMON,
  payload,
});

export const failure = error => ({
  type: actionTypes.FAILURE,
  error,
});
export const loadOrderSuccess = order => ({
  type: actionTypes.ORDER_LOAD_SUCCESS,
  payload: { order },
});
export const loadReviewSuccess = review => ({
  type: actionTypes.REVIEW_LOAD_SUCCESS,
  payload: { review },
});
export const loadOrderInfoSuccess = orderInfo => ({
  type: actionTypes.ORDER_INFO_LOAD_SUCCESS,
  payload: { orderInfo },
});
export const loadUserSuccess = user => ({
  type: actionTypes.USER_LOAD_SUCCESS,
  payload: { user },
});
export const userSignOut = () => ({ type: actionTypes.USER_SIGN_OUT });
