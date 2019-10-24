import axios from 'axios';
import { getToken } from './auth/AuthSession';
import redirect from './auth/redirect';
import { PROXY_URL } from '../constants';
import { downloadImage } from '../utils';

const getUrl = endPoint => process.env.API_HOST + endPoint;

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }

  throw new Error(response);
}

function checkSuccess(response, ctx) {
  if (response.success !== false) {
    return response;
  }

  if (response.errorCode === 1) {
    return redirect('/login', ctx);
  }
  throw new Error(response.msg);
}

export const post = async ({ endPoint, data, hasAuth, ctx = {}, isFile, onUploadProgress }) => {
  const headers = {};
  let body;
  if (hasAuth) {
    const token = getToken(ctx);
    if (!token) {
      return redirect('/login', ctx);
    }
    headers.Authorization = token;
  }
  if (isFile) {
    headers['Content-Type'] = 'multipart/form-data';
    body = new FormData();
    data.forEach(item => {
      if (typeof item === 'object' && item.file) {
        body.append(item.key, item.file, item.name);
      } else {
        body.append(item.key, item.value);
      }
    });
  } else {
    headers['Content-Type'] = 'application/json';
    body = data;
  }

  return axios
    .post(getUrl(endPoint), body, { headers, onUploadProgress })
    .then(checkStatus)
    .then(res => checkSuccess(res, ctx))
    .catch(error => {
      const err = error;
      err.code = 'ENOENT';
      throw err;
    });
};

export const get = async ({ endPoint, hasAuth, ctx = {}, fileName }) => {
  let headers;
  const responseType = fileName ? 'blob' : undefined;
  if (hasAuth) {
    const token = getToken(ctx);
    if (!token) {
      return redirect('/login', ctx);
    }
    headers = token ? { Authorization: token } : null;
  }

  return axios
    .get(getUrl(endPoint), { headers, responseType })
    .then(checkStatus)
    .then(res => checkSuccess(res, ctx))
    .then(res => {
      if (fileName) {
        const url = window.URL.createObjectURL(new Blob([res]));
        downloadImage(url, fileName);
      }
      return res;
    })
    .catch(error => {
      const err = error;
      err.code = 'ENOENT';
      throw err;
    });
};

export const deleteRequest = async (endPoint, hasAuth, ctx = {}) => {
  const headers = {};
  if (hasAuth) {
    const token = getToken(ctx);
    if (!token) {
      return redirect('/login', ctx);
    }
    headers.Authorization = token;
  }

  return axios
    .delete(getUrl(endPoint), { headers })
    .then(checkStatus)
    .then(res => checkSuccess(res, ctx));
};
