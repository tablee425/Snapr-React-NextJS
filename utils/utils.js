import Router from 'next/router';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import moment from 'moment-timezone';

import { Routes, PROXY_URL, PrivacyUrls } from './constants';
export const checkEmail = email => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

export const checkPassLength = phrase => phrase.length >= 8;

export const checkPass = phrase => {
  // eslint-disable-next-line no-useless-escape
  const passRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[0-9a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
  return passRe.test(phrase);
};

export const arrayBufferToBase64 = buffer => {
  let binary = '';
  const bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach(b => {
    binary += String.fromCharCode(b);
  });

  return window.btoa(binary);
};

export const MakeCancelable = promise => {
  let hasCanceled = false;

  const CancelledError = new Error('Cancelled');
  CancelledError.isCancelled = true;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(val => !hasCanceled && resolve(val)).catch(err => reject(err));
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
};

export const generateRandomString = (count = 5) =>
  Math.random()
    .toString(36)
    .substr(2, count);

export const getRoute = as => {
  let route = Routes[as];
  if (route) {
    return route;
  }

  if (as.startsWith('/order/review/')) {
    route = `${Routes['/order/review/:id']}?id=${as.replace('/order/review/', '')}`;
  } else if (as.startsWith('/order/detail/')) {
    route = `${Routes['/order/detail/:id']}?id=${as.replace('/order/detail/', '')}`;
  } else if (as.startsWith('/order/draft/')) {
    route = `${Routes['/order/draft/:id']}?id=${as.replace('/order/draft/', '')}`;
  } else if (as.startsWith('/order/download/')) {
    route = `${Routes['/order/download/:id']}?id=${as.replace('/order/download/', '')}`;
  } else if (as.startsWith('/order/')) {
    route = `${Routes['/order/:id']}?id=${as.replace('/order/', '')}`;
  } else if (as.startsWith('/two-factor/')) {
    route = `${Routes['/two-factor/:method']}?method=${as.replace('/two-factor/', '')}`;
  }

  return route;
};
export const pushRoute = as => Router.push(getRoute(as), as).then(() => window.scrollTo(0, 0));
export const replaceRoute = as => Router.replace(getRoute(as), as).then(() => window.scrollTo(0, 0));
export const prefetchRoute = as => Router.prefetch(getRoute(as));

export const downloadImages = async images => {
  const zip = new JSZip();

  const promises = images.map(async file => {
    const response = await fetch(PROXY_URL + file);
    const buffer = await response.arrayBuffer();
    const imageStr = arrayBufferToBase64(buffer);
    zip.file(file.split('/').pop(), imageStr, { base64: true });
  });

  await Promise.all(promises);
  const content = await zip.generateAsync({ type: 'blob' });
  FileSaver.saveAs(content, 'images.zip');
};

export const downloadImage = (url, name) => {
  const link = document.createElement('a');
  link.download = name || url.split('/').pop();
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const convertUKTime = date => moment(date).tz('Europe/London');
export const convertLocalTime = date => moment(date).tz(moment.tz.guess());

export const getMinStartDate = () => {
  const current = moment();
  const UKDate = convertUKTime(current);
  const before = setDateHour(UKDate, 7);
  const after = setDateHour(UKDate, 19);

  if (current.isBefore(before)) {
    return convertLocalTime(before);
  }
  if (current.isAfter(after)) {
    return convertLocalTime(before.add(1, 'day'));
  }
  return current;
};

export const setDateHour = (date, hour) => moment(date).set({ hour, minute: 0, second: 0, millisecond: 0 });

export const getFirstTimeOfMonth = date =>
  moment(date).set({ date: 1, hour: 0, minute: 0, second: 0, millisecond: 0 });

export const getPDFUrl = (item, isAndroidDevice) => {
  const url = `${process.env.WEB_HOST}/static/${PrivacyUrls[item]}`;
  if (isAndroidDevice) {
    return `http://docs.google.com/gview?embedded=true&url=${url}`;
  }
  return url;
};
