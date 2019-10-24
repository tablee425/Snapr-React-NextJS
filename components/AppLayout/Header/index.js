import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Head from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';

import { getRoute } from '~/utils/utils';

import * as Styled from './styled';
import MobileNav from '../MobileNav';

Router.onRouteChangeStart = url => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Header = props => (
  <Styled.Container>
    <Head>
      <title>{props.title || 'Snapr'}</title>
      <link rel="stylesheet" type="text/css" href="/static/css/nprogress.css" />
    </Head>

    {!props.noHeader && <MobileNav menus={[...options.left, ...options.right]} />}

    <Link href="/">
      <a style={{ zIndex: 2 }}>
        <Styled.Logo src="/static/icons/splashLogo.png" />
      </a>
    </Link>

    {!props.noHeader && (
      <Styled.HeaderWrapper>
        <Styled.Panel>
          {options.left.map(({ label, href, prefetch }) => (
            <Link key={label} as={href} href={getRoute(href)} prefetch={prefetch}>
              <a>{label}</a>
            </Link>
          ))}
        </Styled.Panel>
        <Styled.Panel>
          {options.right.map(({ label, href, prefetch }) => (
            <Link key={label} as={href} href={getRoute(href)} prefetch={prefetch}>
              <a>{label}</a>
            </Link>
          ))}
        </Styled.Panel>
      </Styled.HeaderWrapper>
    )}
  </Styled.Container>
);

const options = {
  left: [{ label: 'Home', href: '/', prefetch: true }, { label: 'About', href: '/about', prefetch: true }],
  right: [
    { label: 'Client Sign Up', href: '/signup', prefetch: true },
    { label: 'Client Login', href: '/login', prefetch: true },
  ],
};

Header.propTypes = {
  noHeader: PropTypes.bool,
  title: PropTypes.string,
};

export default Header;
