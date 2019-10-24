import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Colors from '~/utils/colors';
import { Media } from '~/utils/constants';
import { DivRow, DivColumn, Avatar as NormalAvatar, YellowButton } from '~/components';

const EditInfo = ({ user, onSubmit, loading, preview }) => {
  const renderField = (label, description) => (
    <ItemContainer>
      <ItemParameter>{label}</ItemParameter>
      <ItemValue>{description}</ItemValue>
    </ItemContainer>
  );

  return (
    <Container>
      <Title>Edit Info</Title>
      <Content>
        <AvatarWrapper>
          <Avatar src={preview || user.avatarLink} />
          <UpdateButton onChange={onSubmit} isUpload loading={loading} accept="image/*">
            Update
          </UpdateButton>
        </AvatarWrapper>

        <DivColumn>
          {renderField('First Name:', user.firstName)}
          {renderField('Last Name:', user.lastName)}
          {renderField('Email:', user.email)}
          {renderField('Company:', user.companyName)}
          {renderField('Mobile:', user.phoneNumber)}
        </DivColumn>
      </Content>
      <Separator />
    </Container>
  );
};

const Container = DivColumn.extend`
  align-items: center;
`;

export const Title = styled.div`
  margin: 0 50px;
  font-size: 20px;
  font-weight: bold;
`;

const Content = DivRow.extend`
  margin-top: 15px;

  ${Media.phone`
    flex-direction: column;
  `};
`;

const AvatarWrapper = styled(DivColumn)`
  flex: none;
  margin: 20px 40px 0 0;
  align-items: center;

  ${Media.phone`
    margin: 0;
  `};
`;

const Avatar = styled(NormalAvatar)`
  && {
    width: 90px;
    height: 86px;
  }
`;

const UpdateButton = styled(YellowButton)`
  && {
    width: 100px;
    margin-top: 20px;
  }
`;

export const ItemContainer = DivRow.extend`
  flex: none;
  margin-top: 15px;
`;

export const ItemParameter = styled.div`
  width: 110px;
  font-size: 18px;
`;

export const ItemValue = styled.div`
  flex: 1;
  color: ${Colors.sketchGrey};
  font-size: 18px;
  word-break: break-word;
`;

export const Separator = styled.div`
  align-self: stretch;
  margin: 25px 0 0;
  height: 1px;
  background-color: #979797;
`;

EditInfo.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  preview: PropTypes.string,
};

export default EditInfo;
