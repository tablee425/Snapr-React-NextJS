import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { closeAlertDialog, setCommon } from '~/utils/redux/actions';
import { makeSelectAlert, makeSelectCommon } from '~/utils/redux/selectors';
import Colors from '~/utils/colors';
import { Media } from '~/utils/constants';

import Footer from './Footer';
import Header from './Header';
import AlertDialog from '../Materials/AlertDialog';
import PrivacySnack from './PrivacySnack';
import DivColumn from './DivColumn';

class AppLayout extends React.Component {
  getMainContent = () => {
    if (this.props.withLayout) {
      return (
        <LayoutWrapper>
          <Layout>{this.props.children}</Layout>
        </LayoutWrapper>
      );
    }
    if (this.props.withForm) {
      return (
        <LayoutWrapper>
          <Layout withForm formTopMargin={this.props.formTopMargin}>
            {this.props.children}
          </Layout>
        </LayoutWrapper>
      );
    }
    return <Content>{this.props.children}</Content>;
  };

  noAction = () => {
    this.props.dispatch(closeAlertDialog());
    if (this.props.alert.noAction) {
      this.props.alert.noAction();
    }
  };

  yesAction = () => {
    this.props.dispatch(closeAlertDialog());
    if (this.props.alert.yesAction) {
      this.props.alert.yesAction();
    }
  };

  onClosePrivacy = () => {
    localStorage.setItem('privacy', true);
    this.props.dispatch(setCommon({ isPrivacy: true }));
  };

  render() {
    return (
      <div>
        <Container noFooter={this.props.noFooter}>
          <Header noHeader={this.props.noHeader} />

          {this.getMainContent()}
        </Container>

        <CopyRight>© 2017-2018 Snapr ® Limited. All rights reserved</CopyRight>
        {!this.props.noFooter && <Footer isAndroidDevice={this.props.common.isAndroidDevice} />}

        <AlertDialog
          open={this.props.alert.isOpen}
          noAction={this.noAction}
          yesAction={this.yesAction}
          noLabel={this.props.alert.noLabel}
          yesLabel={this.props.alert.yesLabel}
          title={this.props.alert.title}
          description={this.props.alert.description}
        />

        <PrivacySnack
          open={!this.props.common.isPrivacy}
          onClose={this.onClosePrivacy}
          isAndroidDevice={this.props.common.isAndroidDevice}
        />
      </div>
    );
  }
}

const CopyRight = styled.div`
  font-size: 14px;
  color: ${Colors.sketchGrey};
  text-align: center;
  margin-top: 10px;
`;

const Container = DivColumn.extend`
  min-height: calc(100vh - 130px);
`;

const LayoutWrapper = DivColumn.extend`
  padding: 0 3px;
`;

const Layout = DivColumn.extend`
  align-self: center;

  flex: ${({ withForm }) => (withForm ? 'none' : 1)};
  width: ${({ withForm }) => (withForm ? 'unset' : '1200px')};
  max-width: 100%;
  align-items: ${({ withForm }) => (withForm ? 'center' : 'unset')};
  margin-top: ${({ formTopMargin }) => formTopMargin || 0}px;

  background-color: white;
  border: solid 1px ${Colors.black};
  border-radius: 40px;
  padding: 30px 20px 10px;
  margin-bottom: 10px;

  ${Media.phone`
    max-width: 100%;
    padding: 20px 15px 5px;
  `};
`;

const Content = DivColumn.extend`
  align-self: center;
  width: 100%;
`;

AppLayout.propTypes = {
  noHeader: PropTypes.bool,
  noFooter: PropTypes.bool,
  withLayout: PropTypes.bool,
  withForm: PropTypes.bool,
  children: PropTypes.any,
  alert: PropTypes.object,
  common: PropTypes.object,
  dispatch: PropTypes.func,
  formTopMargin: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  alert: makeSelectAlert(),
  common: makeSelectCommon(),
});

export default connect(mapStateToProps)(AppLayout);
