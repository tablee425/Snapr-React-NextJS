import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';

import { pushRoute } from '~/utils/utils';
import { OrderRequest } from '~/utils/services';
import { Media } from '~/utils/constants';
import Colors from '~/utils/colors';
import { AvatarPanel, TextField, YellowButton, RatingField, RadioGroup, DivRow } from '~/components';
import { makeSelectCommon, makeSelectReview } from '~/utils/redux/selectors';

import MultilineText from './MultilineText';

const validate = values => {
  const errors = {};

  const requiredFields = ['puncService', 'proService', 'costService', 'recommendSnapr', 'additionalComments'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const Form = props => (
  <FormComp onSubmit={props.handleSubmit}>
    <AvatarPanel
      avatarLink={props.freelancer.avatarLink}
      fullName={props.freelancer.fullName}
      description={props.freelancer.email}
    />

    <Description>
      Thank you for choosing to use Snapr ® for your services!<br />
      Please let us know how we did below :)
    </Description>

    {options.rating.map(option => <Rating key={option.name} {...option} readonly={props.isReviewed} />)}

    <RadioGroup
      name="recommendSnapr"
      label={<Label>Would you recommend Snapr ® *</Label>}
      options={options.recommend}
      format={value => value === 'true'}
      containerClasses={{ root: props.classes.recommend }}
      inputClasses={props.common.isPhoneSize ? styles.recommendInputPhone : styles.recommendInput}
      radioClasses={{ root: props.classes.recommendRadio }}
      errorClasses={{ root: props.classes.recommendError }}
      classes={{ root: props.classes.recommendGroup }}
      readonly={props.isReviewed}
    />

    <MultilineText
      label="Additional Comments *"
      name="additionalComments"
      rows="3"
      placeholder="Write a message..."
      readonly={props.isReviewed}
    />

    {!props.isReviewed && (
      <SendButton type="submit" loading={props.submitting}>
        Send
      </SendButton>
    )}
  </FormComp>
);

const FormComp = styled.form`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  width: 450px;
  max-width: 100%;

  ${Media.phone`
    padding: 0;
  `};
`;

const Description = styled.div`
  line-height: 20px;
  margin: 20px 0 5px;
  text-align: center;
  font-size: 14px;
  color: ${Colors.sketchGrey};
`;

const Rating = styled(RatingField)`
  margin-top: 10px;
`;

const Label = styled.div``;

const SendButton = styled(YellowButton)`
  && {
    align-self: flex-end;
    margin-top: 15px;
  }
`;

const options = {
  rating: [
    {
      name: 'puncService',
      label: 'Punctuality of services provided *',
    },
    {
      name: 'proService',
      label: 'Professionalism of services provided *',
    },
    {
      name: 'costService',
      label: 'Value of services provided *',
    },
    {
      name: 'qualityService',
      label: 'Quality of services provided *',
    },
  ],
  recommend: [{ label: 'Yes', value: 'true' }, { label: 'No', value: 'false' }],
};

export const styles = {
  recommendGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recommendInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: -10,
  },
  recommendInputPhone: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  recommendRadio: { marginLeft: 0, marginRight: 0, flexDirection: 'row-reverse' },
  recommendError: { marginTop: 0 },
  recommend: { marginBottom: 30 },
  additional: { border: '1px solid #979797' },
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  freelancer: PropTypes.object,
  classes: PropTypes.any,
  common: PropTypes.object,
  isReviewed: PropTypes.bool,
};

const ReviewForm = reduxForm({ form: 'Review', validate })(Form);

const mapStateToProps = (state, { isReviewed }) => {
  const params = { common: makeSelectCommon() };
  if (isReviewed) {
    params.initialValues = makeSelectReview();
  }
  return createStructuredSelector(params);
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(ReviewForm);
