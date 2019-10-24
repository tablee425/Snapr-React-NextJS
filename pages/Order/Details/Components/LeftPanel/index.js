import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import NormalCircularProgress from '@material-ui/core/CircularProgress';

import { DivRow, DivColumn, AvatarPanel as NormalAvatarPanel } from '~/components';
import { Media } from '~/utils/constants';
import Message from './Message';
import InputBox from './InputBox';

class LeftPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listKey: 'random',
      messages: props.chatHistory,
      hasMoreItems: props.loadMore,
      isSocketConnected: true,
    };
  }

  componentDidMount() {
    if (this.props.freelancer) {
      this.refList.scrollTop = this.refList.scrollHeight;
      this.initSocket();
    }
  }

  componentDidUpdate() {
    if (this.props.freelancer) {
      this.initSocket();
    }
  }

  componentWillUnmount() {
    if (this.state.subscribed) {
      this.props.socket.off(
        `clientListener-jobId-${this.props.jobId}-userToken-${this.props.token}`,
        this.onReceiveNewMessage,
      );
      this.props.socket.off(
        `clientListener-LoadMore-jobId-${this.props.jobId}-userToken-${this.props.token}`,
        this.onReceiveOldMessages,
      );
      this.props.socket.off(`disconnect`, this.onDisconnect);
      this.props.socket.off(`connect`, this.onConnect);
    }
  }

  initSocket = () => {
    if (this.state.subscribe && !this.state.subscribed) {
      this.props.socket.on(
        `clientListener-jobId-${this.props.jobId}-userToken-${this.props.token}`,
        this.onReceiveNewMessage,
      );
      this.props.socket.on(
        `clientListener-LoadMore-jobId-${this.props.jobId}-userToken-${this.props.token}`,
        this.onReceiveOldMessages,
      );
      this.props.socket.on('connect', this.onConnect);
      this.props.socket.on(`disconnect`, this.onDisconnect);

      this.setState({ subscribed: true });
    }
  };

  onConnect = () => {
    this.props.onSocketConnect(true);
    this.setState({ isSocketConnected: true });
  };

  onDisconnect = () => {
    this.props.onSocketConnect(false);
    this.setState({ isSocketConnected: false });
  };

  onReceiveNewMessage = ({ lastChat, loadMore }) => {
    const { messages } = this.state;
    messages.push(lastChat);
    this.setState({ messages, hasMoreItems: loadMore }, () => {
      this.refList.scrollTop = this.refList.scrollHeight;
    });

    if (!lastChat.isSent) {
      this.props.socket.emit('clientSetSeen', {
        jobId: this.props.jobId,
        userToken: this.props.token,
        messageId: lastChat._index,
      });
    }
  };

  onReceiveOldMessages = ({ chatHistory, loadMore }) => {
    const oldScrollHeight = this.refList.scrollHeight;
    const { messages } = this.state;
    this.setState({ messages: [...chatHistory, ...messages], hasMoreItems: loadMore }, () => {
      this.goToPrevScroll(oldScrollHeight);
    });
  };

  onSendMessage = text => {
    this.props.socket.emit('clientSend', {
      jobId: this.props.jobId,
      type: 1,
      text,
      clientFirstName: this.props.user.firstName,
      clientAvatar: this.props.user.avatarLink,
      userToken: this.props.token,
    });
  };

  loadItems = page => {
    if (!this.state.subscribe) {
      return;
    }
    this.props.socket.emit('clientLoadMore', {
      jobId: this.props.jobId,
      userToken: this.props.token,
      messageId: this.state.messages[0]._index,
    });
  };

  goToPrevScroll = oldScrollHeight => {
    this.refList.scrollTop = this.refList.scrollHeight - oldScrollHeight + this.refList.scrollTop;
  };

  render() {
    if (!this.props.freelancer) {
      return <Container />;
    }
    return (
      <Container>
        <AvatarPanel
          avatarLink={this.props.freelancer.avatarLink}
          fullName={this.props.freelancer.firstName}
          rating={this.props.freelancer.rating}
        />
        <ListWrapper
          key={this.state.listKey}
          innerRef={ref => {
            this.refList = ref;
          }}
          isOffline={!this.props.isOnline || !this.state.isSocketConnected}
        >
          <InfiniteList
            loadMore={this.loadItems}
            hasMore={this.state.hasMoreItems}
            loader={<CircularProgress key="loading" size={30} />}
            useWindow={false}
            isReverse
          >
            {this.state.messages.map(message => (
              <Message
                key={message._index}
                userAvatar={this.props.user.avatarLink}
                freelancerAvatar={this.props.freelancer.avatarLink}
                {...message}
              />
            ))}
            <div style={{ height: 7 }} />
          </InfiniteList>
        </ListWrapper>
        <InputBox
          onSend={this.onSendMessage}
          isSocketConnected={!this.props.isOnline || !this.state.isSocketConnected}
        />
      </Container>
    );
  }
}

const Container = DivColumn.extend`
  flex: none;
  width: 450px;
  align-items: center;

  ${Media.desktop`
    margin-top: 20px;
  `};
  ${Media.phonePortrait`
    width: 100%;
  `};
`;

const AvatarPanel = NormalAvatarPanel.extend`
  margin: 5px 0 17px;
`;

const ListWrapper = styled.div`
  flex: 1;
  border-top: 1px solid #979797;
  border-bottom: 1px solid #979797;
  position: relative;
  align-self: stretch;
  overflow: auto;
  opacity: ${({ isOffline }) => (isOffline ? 0.7 : 1)};
  min-height: 400px;
`;

const InfiniteList = styled(InfiniteScroll)`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 20px;
  right: 20px;
  top: 0;
`;

const CircularProgress = styled(NormalCircularProgress)`
  && {
    margin: 7px 0;
    align-self: center;
  }
`;

LeftPanel.getDerivedStateFromProps = (props, state) => {
  if (props.socket && !state.subscribe) {
    return { subscribe: true };
  }
  return null;
};

LeftPanel.propTypes = {
  freelancer: PropTypes.any,
  chatHistory: PropTypes.array,
  loadMore: PropTypes.bool,
  jobId: PropTypes.string,
  token: PropTypes.string,
  user: PropTypes.object,
  socket: PropTypes.object,
  onSocketConnect: PropTypes.func,
  isOnline: PropTypes.bool,
};

export default LeftPanel;
