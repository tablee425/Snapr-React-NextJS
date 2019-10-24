import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { getRoute, getPDFUrl } from '~/utils/utils';
import { Media } from '~/utils/constants';
import DivRow from '../DivRow';

const renderLinkWrapper = (label, href) => (
  <LinkWrapper>
    <a href={href}>{label}</a>
  </LinkWrapper>
);

const Footer = ({ isAndroidDevice }) => (
  <Wrapper>
    {renderLinkWrapper('Privacy', getPDFUrl('privacy', isAndroidDevice))}
    {renderLinkWrapper('Cookies', getPDFUrl('cookie', isAndroidDevice))}
    {renderLinkWrapper('Terms', getPDFUrl('termCondition', isAndroidDevice))}
    {renderLinkWrapper('Copyright', getPDFUrl('copyRight', isAndroidDevice))}
    <LinkWrapper>
      <Link href={getRoute('/contact')} as="/contact" prefetch>
        <a>Contact</a>
      </Link>
    </LinkWrapper>
  </Wrapper>
);

const LinkWrapper = DivRow.extend`
  justify-content: center;

  a {
    font-size: 18px;
    text-decoration: none;
    color: #878585;
  }

  ${Media.phonePortrait`
    flex: none;
    width: 33.333333%;
  `};
`;

const Wrapper = DivRow.extend`
  position: relative;
  flex: none;
  align-items: center;
  justify-content: space-around;
  height: 93px;
  background-color: white;

  ${Media.phonePortrait`
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 12px 20px;
  `};
`;

Footer.propTypes = {
  isAndroidDevice: PropTypes.bool,
};

export default Footer;
