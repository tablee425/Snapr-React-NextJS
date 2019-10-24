import { css } from 'styled-components';
import Colors from './colors';

export const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

const sizes = {
  desktop: 1199, // original desktop
  tablet: 991, // tablet portrait
  phone: 768, // phone landscape && iPad Portrait = 768
  phonePortrait: 575, // phone portrait
};

// iterate through the sizes and create a media template
const TempMedia = Object.keys(sizes).reduce((accumulator, label) => {
  // eslint-disable-next-line no-param-reassign
  accumulator[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export const Media = { ...TempMedia };

export const Routes = {
  '/': '/',
  '/about': '/OnBoarding/About',
  '/signup': '/OnBoarding/SignUp',
  '/signup/success': '/OnBoarding/SignUp/SuccessForm',
  '/login': '/OnBoarding/Login',
  '/forgot': '/OnBoarding/Forgot',
  '/info/mfa': '/OnBoarding/MFA/MFAInfo',
  '/two-factor/:method': '/OnBoarding/MFA',

  '/support': '/Footers/Support',
  '/contact': '/Footers/Contact',

  '/home': '/Profile/Home',
  '/profile': '/Profile/Edit',

  '/order': '/Order/Edit',
  '/order/:id': '/Order/Edit',
  '/order/review/:id': '/Order/Review',
  '/order/download/:id': '/Order/Download',
  '/order/detail/:id': '/Order/Details',
  '/order/draft/:id': '/Order/Draft',
};

export const emailLoginMFA = 'emailLoginMFA';
export const emailSignupMFA = 'emailSignupMFA';

export const aryColorStatus = [Colors.darkGray, Colors.red, Colors.primaryColor, Colors.green];

export const PrivacyUrls = {
  privacy: 'Snapr_Privacy_Policy.pdf',
  copyRight: 'Snapr_Copyright.pdf',
  termCondition: 'Snapr_Terms_and_Conditions_of_Use.pdf',
  cookie: 'web/Snapr_Cookie_Policy.pdf',
};
