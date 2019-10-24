import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import { DivRow, DivColumn, Avatar } from '~/components';
import Colors from '~/utils/colors';

const Message = props => {
  if (props.type === 1) {
    return (
      <Container isSent={props.isSent}>
        <Avatar src={props.isSent ? props.userAvatar : props.freelancerAvatar} width={38} height={38} />
        <TextWrapper>
          <Text isSent={props.isSent}>
            {props.text}
            <Date>{moment(props.createdAt).format('h:mm A')}</Date>
          </Text>
        </TextWrapper>
      </Container>
    );
  }
  return null;
};

const Container = DivRow.extend`
  flex-direction: ${({ isSent }) => (isSent ? 'row-reverse' : 'row')};
  align-items: flex-end;
  margin: 3px 0;
`;

const TextWrapper = DivColumn.extend``;

const Text = DivColumn.extend`
  max-width: 100%;
  word-break: break-word;
  align-self: ${({ isSent }) => (isSent ? 'flex-end' : 'flex-start')};
  margin-left: ${({ isSent }) => (isSent ? 30 : 2)}px;
  margin-right: ${({ isSent }) => (isSent ? 2 : 30)}px;
  border: 1px solid #979797;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: ${({ isSent }) => (isSent ? Colors.primaryColor : '#F2F2F2')};
  white-space: pre-line;
`;

const Date = styled.div`
  align-self: flex-end;
  font-size: 12px;
  line-height: 20px;
`;

Message.propTypes = {
  type: PropTypes.number,
  // user: PropTypes.object,
  text: PropTypes.string,
  isSent: PropTypes.bool,
  createdAt: PropTypes.any,
  userAvatar: PropTypes.string,
  freelancerAvatar: PropTypes.string,
};

export default Message;
