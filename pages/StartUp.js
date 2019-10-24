import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MobileDetect from 'mobile-detect';

import { setCommon } from '~/utils/redux/actions';

class StartUp extends React.Component {
  componentDidMount() {
    const md = new MobileDetect(window.navigator.userAgent);
    this.props.dispatch(
      setCommon({
        isPrivacy: localStorage.getItem('privacy') === 'true',
        isPhoneSize: window.innerWidth < 769,
        isAndroidDevice: md.os() === 'AndroidOS',
        isiOSDevice: md.os() === 'iOS',
      }),
    );

    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
    window.addEventListener('resize', this.resizeWindow);

    this.enableHover();
  }

  enableHover = () => {
    const container = document.body;
    if (
      !('ontouchstart' in window || navigator.maxTouchPoints) // works on most browsers
    ) {
      // works on IE10/11 and Surface
      container.className += ' hasHover';
    }
  };

  updateOnlineStatus = () => {
    this.props.dispatch(setCommon({ isOnline: navigator.onLine }));
  };

  resizeWindow = () => {
    this.props.dispatch(setCommon({ isPhoneSize: window.innerWidth < 769 }));
  };

  render() {
    return this.props.children;
  }
}

StartUp.propTypes = {
  dispatch: PropTypes.func,
  children: PropTypes.any,
};

export default connect()(StartUp);
