import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

import { DivRow, DivColumn, YellowButton } from '~/components';

class InputBox extends React.Component {
  state = {};

  renderFileButton = (src, onChange, accept) => (
    <IconButton>
      <Icon src={src} />
      <input type="file" onChange={onChange} style={{ display: 'none' }} accept={accept} />
    </IconButton>
  );

  onCameraClick = () => {};

  onSend = () => {
    const { message } = this.state;
    if (message) {
      this.setState({ message: '' });
      this.props.onSend(message);
    }
  };

  handleKeyDown = e => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      this.onSend();
    }
  };

  render() {
    return (
      <Container>
        <Input
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
          placeholder="Write a message..."
          rows={3}
          onKeyDown={this.handleKeyDown}
          disabled={this.props.isSocketConnected}
        />

        <ButtonWrapper>
          {this.renderFileButton('/static/icons/fileMessage.png', e => this.props.onFileUpload(e, 1))}
          <IconButton onClick={this.onCameraClick}>
            <Icon src="/static/icons/cameraMessage.png" />
          </IconButton>
          {this.renderFileButton(
            '/static/icons/photoMessage.png',
            e => this.props.onFileUpload(e, 2),
            'image/*',
          )}
          <div style={{ flex: 1 }} />
          <SendButton onClick={this.onSend} disabled={this.props.isSocketConnected}>
            Send
          </SendButton>
        </ButtonWrapper>
      </Container>
    );
  }
}

const Container = DivColumn.extend`
  flex: none;
  align-self: stretch;
  margin: 10px 20px 0;
`;

const Input = styled.textarea`
  border: none;
  resize: none;
  font-size: 16px;
`;

const Icon = styled.img`
  width: 30px;
`;

const ButtonWrapper = DivRow.extend`
  align-items: center;
`;

const SendButton = styled(YellowButton)`
  width: 60px;
`;

InputBox.propTypes = {
  onFileUpload: PropTypes.func,
  onSend: PropTypes.func,
  isSocketConnected: PropTypes.bool,
};

export default InputBox;
