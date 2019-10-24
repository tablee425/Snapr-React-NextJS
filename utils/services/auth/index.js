import redirect from './redirect';
import { deleteRequest, get, post } from '../request';
import { getToken, removeBrowserCookie } from './AuthSession';

export const signIn = async (email, password) =>
  post({
    endPoint: '/account/login/client',
    data: {
      email,
      password,
    },
  });

export const reviewSignIn = async ctx =>
  post({
    endPoint: '/account/login/client',
    data: {},
    hasAuth: true,
    ctx,
  });

export const signInWithToken = async ctx => {
  const { reviewJobIds, ...response } = await post({
    endPoint: '/account/login/client',
    data: {},
    hasAuth: true,
    ctx,
  });
  if (reviewJobIds.length > 0) {
    redirect(`/order/review/${reviewJobIds[0]}`, ctx);
  }
  return response;
};

export const signUp = async values => post({ endPoint: '/account/client', data: values });

export const forgot = async email => post({ endPoint: '/account/reset/client', data: { email } });

export const signOut = () => {
  removeBrowserCookie('token');
  redirect('/login', {});
};

export const redirectIfAuthenticated = ctx => {
  if (getToken(ctx)) {
    redirect('/home', ctx);
    return true;
  }
  return false;
};

export const redirectIfUnAuthenticated = ctx => {
  if (!getToken(ctx)) {
    redirect('/login', ctx);
    return true;
  }
  return false;
};

export const getUserProfile = async ctx => get({ endPoint: '/client/profile', hasAuth: true, ctx });

export const uploadProfileAvatar = async files =>
  post({ endPoint: '/client/profile/edit/avatar', data: files, hasAuth: true, ctx: {}, isFile: true });

export const uploadProfileAgent = async values =>
  post({ endPoint: '/client/profile/edit/agents', data: values, hasAuth: true });

export const updateProfileNotification = async values =>
  post({ endPoint: '/client/profile/edit/notifications', data: values, hasAuth: true });

export const updateProfilePassword = async (currentPassword, newPassword) =>
  post({ endPoint: '/client/profile/edit/password', data: { currentPassword, newPassword }, hasAuth: true });

export const deleteAccount = async () => deleteRequest('/client/account', true);

export const downloadAccount = async fileName =>
  get({ endPoint: '/client/profile/download', hasAuth: true, fileName });

export const requestMFA = async (email, smsCode, isSignup) =>
  post({ endPoint: '/client/mfa', data: { email, smsCode, isSignup } });

export const requestNewMFA = async email => post({ endPoint: '/client/mfa/retry', data: { email } });

export const requestContact = async values => post({ endPoint: '/client/contact', data: values });
