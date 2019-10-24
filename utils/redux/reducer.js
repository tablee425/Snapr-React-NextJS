import { actionTypes } from './actions';

export const initialState = {
  alert: {
    isOpen: false,
    title: '',
    description: '',
    noLabel: null,
    yesLabel: null,
    noAction: null,
    yesAction: null,
  },
  common: {
    isPrivacy: true,
    isOnline: true,
    isPhoneSize: false,
    isAndroidDevice: false,
    isiOSDevice: false,
  },

  error: false,
  order: {},
  review: false,
  orderInfo: {},
  user: false,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ALERT_OPEN:
      return {
        ...state,
        alert: { isOpen: true, ...action.payload },
      };
    case actionTypes.ALERT_CLOSE:
      return { ...state, alert: { ...state.alert, isOpen: false } };
    case actionTypes.SET_COMMON:
      return { ...state, common: { ...state.common, ...action.payload } };

    case actionTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.error },
      };
    case actionTypes.ORDER_LOAD_SUCCESS:
      return { ...state, order: action.payload.order };
    case actionTypes.REVIEW_LOAD_SUCCESS:
      return { ...state, review: action.payload.review };
    case actionTypes.ORDER_INFO_LOAD_SUCCESS:
      return { ...state, orderInfo: action.payload.orderInfo };
    case actionTypes.USER_LOAD_SUCCESS:
      return { ...state, user: { ...(state.user || {}), ...action.payload.user } };
    case actionTypes.USER_SIGN_OUT:
      return { ...state, user: false };

    default:
      return state;
  }
}

export default appReducer;
