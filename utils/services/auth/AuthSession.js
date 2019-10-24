import cookie from 'js-cookie';
import { emailLoginMFA, emailSignupMFA } from '../../constants';

export const setBrowserCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value);
  }
};

export const removeBrowserCookie = key => {
  if (process.browser) {
    cookie.remove(key);
  }
};

export const getCookie = (key, req) =>
  process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);

const getCookieFromBrowser = key => cookie.get(key);

const getCookieFromServer = (key, req) => {
  if (!req || !req.cookies || !req.cookies[key]) {
    return null;
  }
  return req.cookies[key];
};

export const setMFACookie = async data => {
  Object.keys(data).forEach(key => {
    setBrowserCookie(key, data[key]);
  });
};

export const getToken = ctx => getCookie('token', ctx && ctx.req);

export const getEmailLoginMFA = async ctx => {
  const email = getCookie(emailLoginMFA, ctx && ctx.req);
  if (!email) {
    const err = new Error();
    err.code = 'ENOENT';
    throw err;
  } else {
    return email;
  }
};

export const getEmailSignupMFA = async ctx => {
  const email = getCookie(emailSignupMFA, ctx && ctx.req);
  if (!email) {
    const err = new Error();
    err.code = 'ENOENT';
    throw err;
  } else {
    return email;
  }
};
