import styled from 'styled-components';

import { Media } from '~/utils/constants';
import DivRow from '../DivRow/index';
import DivColumn from '../DivColumn/index';

export const Container = styled(DivColumn)`
  flex: none;
  align-items: center;
`;

export const Logo = styled.img`
  height: 74px;
  margin-top: 10px;
`;

export const Panel = DivRow.extend`
  justify-content: space-around;

  a {
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
    color: black;
    white-space: nowrap;
  }
`;

export const HeaderWrapper = DivRow.extend`
  flex: none;
  width: 1050px;
  max-width: 100%;
  height: 80px;
  align-items: center;
  border-bottom: solid black 1px;

  ${Media.phone`
    display: none;
  `};
`;
