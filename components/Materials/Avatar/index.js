import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NormalAvatar from '@material-ui/core/Avatar';

const Avatar = ({ src, ...rest }) => {
  let placeholderWidth;
  let placeholderHeight;
  let placeholderMargin;
  if (!src) {
    placeholderWidth = ((rest.width || 77) * 48) / 77;
    placeholderHeight = ((rest.height || 74) * 43) / 74;
    placeholderMargin = ((rest.width || 77) * 7) / 77;
  }

  return (
    <StyledAvatar src={src} {...rest}>
      {!src && (
        <img
          style={{ marginBottom: placeholderMargin }}
          src="/static/icons/profile.png"
          width={placeholderWidth}
          height={placeholderHeight}
        />
      )}
    </StyledAvatar>
  );
};

const StyledAvatar = styled(NormalAvatar)`
  && {
    width: ${({ width }) => width || 77}px;
    height: ${({ height }) => height || 74}px;
  }
`;

Avatar.propTypes = {
  src: PropTypes.string,
};

export default Avatar;
