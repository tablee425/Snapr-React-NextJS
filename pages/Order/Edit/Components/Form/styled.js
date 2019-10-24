import styled from 'styled-components';
import { SubmitButton, DivRow, DivColumn } from '~/components';
import { Media } from '~/utils/constants';

export const styles = {
  case: {
    width: 110,
    '@media (max-width: 768px)': {
      width: '100%',
      marginTop: 15,
    },
  },
  address: {
    flex: 1,
    marginRight: 15,
    '@media (max-width: 768px)': {
      marginRight: 0,
    },
  },

  access: { marginTop: 15 },
  accessGroup: { flexDirection: 'row', justifyContent: 'space-between' },
  accessRadio: { marginLeft: 0, marginRight: 0, flexDirection: 'row-reverse' },

  photographer: { marginTop: 5 },

  specific: { marginTop: 15 },
  specificGroup: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
  specificCheckBox: {
    width: '32%',
    marginLeft: 0,
    marginRight: 0,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    '@media (max-width: 575px)': {
      width: '100%',
    },
  },

  bedrooms: { width: '31%', '@media (max-width: 768px)': { width: '100%' } },
  furnishing: { width: '31%', '@media (max-width: 768px)': { width: '100%', marginTop: 15 } },
  bedroomLabel: { width: '117%' },

  date: { marginLeft: 15, marginRight: 15, '@media (max-width: 768px)': { margin: '15px 0' } },

  agree: { marginTop: 15, alignSelf: 'center' },
};

export const FormComp = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  padding: 20px 40px 10px;

  ${Media.phone`
    padding: 10px 0 10px;
  `};
`;

export const RowWrapper = DivRow.extend`
  margin-top: 15px;
  justify-content: space-between;

  ${Media.phone`
    flex-direction: column;
  `};
`;

export const KeyWrapper = DivColumn.extend`
  margin-top: 5px;
`;

export const UpdateButton = styled(SubmitButton)`
  && {
    width: 220px;
    align-self: center;
    margin-top: 30px;
  }
`;

export const DraftButton = styled(SubmitButton)`
  && {
    width: 220px;
    align-self: center;
    margin-top: 15px;
  }
`;
