import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { openAlertDialog, loadUserSuccess } from '~/utils/redux/actions';
import { AuthRequest, AuthSession } from '~/utils/services';
import { replaceRoute } from '~/utils/utils';
import { Media } from '~/utils/constants';
import { AppLayout, DivRow, DivColumn } from '~/components';
import { makeSelectUser } from '~/utils/redux/selectors';

import { Header, EditInfo, ChangePassword, AddAgent, Notification } from './Components';

class EditProfile extends React.Component {
  state = {};

  onDownloadData = () => {
    this.setState({ isDownloading: true });

    AuthRequest.downloadAccount('profile.xlsx')
      .then(() => {})
      .catch(err => {
        this.props.dispatch(openAlertDialog({ description: err.message }));
      })
      .finally(() => this.setState({ isDownloading: false }));
  };

  onDeleteAccount = async () => {
    try {
      this.props.dispatch(
        openAlertDialog({
          description: 'Are you sure to delete account permanently?',
          noLabel: 'No',
          yesLabel: 'Yes',
          yesAction: async () => {
            this.setState({ isDeleting: true });
            await AuthRequest.deleteAccount();
            AuthSession.removeBrowserCookie('token');
            replaceRoute('/login');
          },
        }),
      );
    } catch (err) {
      this.props.dispatch(openAlertDialog({ description: err.message }));
      this.setState({ isDeleting: false });
    }
  };

  onChangeAvatar = e => {
    if (e.target.files.length > 0) {
      this.setState({ loading: true });
      const file = e.target.files[0];

      AuthRequest.uploadProfileAvatar([{ key: 'avatar', file, name: file.name }])
        .then(({ avatarLink }) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.setState({ preview: reader.result });
          };
          reader.readAsDataURL(file);

          this.props.dispatch(loadUserSuccess({ avatarLink }));
        })
        .catch(err => this.props.dispatch(openAlertDialog({ description: err.message })))
        .finally(() => this.setState({ loading: false }));
    }
  };

  onChangePassword = ({ currentPassword, newPassword }) =>
    AuthRequest.updateProfilePassword(currentPassword, newPassword)
      .then(() => {
        this.props.dispatch(openAlertDialog({ description: 'Password has been updated successfully!' }));
      })
      .catch(err => this.props.dispatch(openAlertDialog({ description: err.message })));

  onAddAgent = values =>
    AuthRequest.uploadProfileAgent(values)
      .then(() => {
        this.props.dispatch(openAlertDialog({ description: 'The agent has been added successfully!' }));
      })
      .catch(err => this.props.dispatch(openAlertDialog({ description: err.message })));

  onUpdateNotification = ({ emailEnabled, textEnabled }) =>
    AuthRequest.updateProfileNotification({ emailEnabled, textEnabled })
      .then(response => {
        this.props.dispatch(openAlertDialog({ description: 'Notification has been updated successfully!' }));
        this.props.dispatch(loadUserSuccess({ emailEnabled, textEnabled }));
      })
      .catch(err => this.props.dispatch(openAlertDialog({ description: err.message })));

  render() {
    return (
      <AppLayout noHeader withLayout>
        <Header
          isDownloading={this.state.isDownloading}
          isDeleting={this.state.isDeleting}
          onDeleteAccount={this.onDeleteAccount}
          onDownloadData={this.onDownloadData}
        />

        <MainContainer>
          <TopContainer>
            <EditInfo
              user={this.props.user}
              preview={this.state.preview}
              onSubmit={this.onChangeAvatar}
              loading={this.state.loading}
            />
            <ChangePassword onSubmit={this.onChangePassword} />
          </TopContainer>
          <TopContainer>
            <AddAgent onSubmit={this.onAddAgent} />
            <Notification onSubmit={this.onUpdateNotification} />
          </TopContainer>
        </MainContainer>
      </AppLayout>
    );
  }
}

const MainContainer = DivColumn.extend`
  position: relative;
  margin: 20px 30px 30px;

  ${Media.tablet`
    margin: 20px 0 5px;
  `};

  ${Media.phone`
    margin: 0 0 5px;
  `};
`;

const TopContainer = DivRow.extend`
  flex: none;
  margin-top: 30px;

  ${Media.tablet`
    flex-direction: column;
    margin-top: 20px;
  `};
`;

EditProfile.getInitialProps = async ({ ctx }) => {
  const promises = [];
  if (!ctx.store.getState().global.user) {
    promises.push(AuthRequest.signInWithToken(ctx));
  }

  const [user] = await Promise.all(promises);
  if (user) {
    ctx.store.dispatch(loadUserSuccess(user.profile));
  }
};

EditProfile.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export default connect(mapStateToProps)(EditProfile);
