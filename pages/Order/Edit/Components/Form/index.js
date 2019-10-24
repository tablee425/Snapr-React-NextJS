import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector } from 'redux-form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import {
  pushRoute,
  getRoute,
  convertUKTime,
  convertLocalTime,
  getMinStartDate,
  setDateHour,
  getPDFUrl,
} from '~/utils/utils';
import { OrderRequest } from '~/utils/services';
import Options from './options';

import {
  SubmitButton,
  Select,
  TextField,
  CheckBox,
  RadioGroup,
  CheckBoxGroup,
  DatePicker,
  TimePicker,
} from '~/components';

import {
  makeSelectOrder,
  makeSelectOrderInfo,
  makeSelectOrderInfoInitialValues,
  makeSelectCommon,
} from '~/utils/redux/selectors';

import * as Styled from './styled';

const getStartTimeError = (date, time) => {
  const UKDate = convertUKTime(time);
  const before = setDateHour(UKDate, 7);
  const after = setDateHour(UKDate, 19);

  if (UKDate.isBefore(before)) {
    return `Should be after ${convertLocalTime(before).format('h:mm A')}`;
  }
  if (UKDate.isAfter(after)) {
    return `Should be before ${convertLocalTime(after).format('h:mm A')}`;
  }
  return undefined;
};

const validate = (values, props) => {
  const errors = {};

  const requiredFields = [
    'agent',
    'address',
    'postCode',
    'access',
    'product',
    'bedrooms',
    'furnishing',
    'property',
  ];

  if (!props.isEditMode) {
    requiredFields.push('agree');
  }

  requiredFields.forEach(field => {
    if (_.get(values, field) === null || _.get(values, field) === undefined) {
      _.set(errors, field, 'Required');
    }
  });

  if (values.product && values.product.indexOf('Photography') > -1) {
    if (
      _.get(values, 'photographerToBeTaken.type') === null ||
      _.get(values, 'photographerToBeTaken.type') === undefined
    ) {
      _.set(errors, 'photographerToBeTaken.type', 'Required');
    }
  }

  if (!values.status || values.status < 1) {
    errors.startTime = getStartTimeError(values.date, values.startTime);
  }

  const isProductPhotography = values.product && values.product.indexOf('Photography') > -1;
  const isSpecificPhotographers =
    isProductPhotography && values.photographerToBeTaken && values.photographerToBeTaken.type === 1;
  if (
    isSpecificPhotographers &&
    (!_.get(values, 'photographerToBeTaken.specificPhotographers') ||
      _.get(values, 'photographerToBeTaken.specificPhotographers').length < 1)
  ) {
    _.set(errors, 'photographerToBeTaken.specificPhotographers', 'Required');
  }

  if (_.get(values, 'access') === 'Key Collection' && !_.get(values, 'keyCollectionAddress')) {
    _.set(errors, 'keyCollectionAddress', 'Required');
  }

  return errors;
};

const Form = props => {
  const { clients, specificPhotographers } = props.isEditMode ? props.initialValues : props.orderInfo;
  const isProductPhotography = props.product && props.product.indexOf('Photography') > -1;
  const isSpecificPhotographers =
    isProductPhotography && props.photographerToBeTaken && props.photographerToBeTaken.type === 1;

  return (
    <Styled.FormComp>
      <Select
        name="agent"
        label="NAME OF AGENT MAKING ORDER"
        options={clients.map(({ id, name }) => ({ value: id, label: name }))}
      />

      <Styled.RowWrapper>
        <TextField name="address" label="FULL ADDRESS OF PROPERTY" className={props.classes.address} />
        <TextField name="postCode" label="POSTCODE" className={props.classes.case} />
      </Styled.RowWrapper>

      <RadioGroup
        name="access"
        label="ACCESS ARRANGEMENT"
        containerClasses={{ root: props.classes.access }}
        radioClasses={{ root: props.classes.accessRadio }}
        classes={{ root: props.classes.accessGroup }}
        options={Options.access}
      />
      {props.access === 'Key Collection' && (
        <Styled.KeyWrapper>
          <TextField name="keyCollectionAddress" label="KEY COLLECTION ADDRESS" />
        </Styled.KeyWrapper>
      )}

      <CheckBoxGroup
        name="product"
        label="PRODUCT"
        containerClasses={{ root: props.classes.access }}
        checkBoxClasses={{ root: props.classes.accessRadio }}
        classes={{ root: props.classes.accessGroup }}
        options={Options.product}
      />

      {isProductPhotography && (
        <Select
          name="photographerToBeTaken.type"
          label="PHOTOGRAPHS TO BE TAKEN"
          options={Options.photographerToBeTaken}
          containerClasses={props.classes.photographer}
        />
      )}

      {isSpecificPhotographers && (
        <CheckBoxGroup
          name="photographerToBeTaken.specificPhotographers"
          options={specificPhotographers.map(item => ({
            value: item.key,
            label: item.value,
          }))}
          containerClasses={{ root: props.classes.specific }}
          checkBoxClasses={{ root: props.classes.specificCheckBox }}
          classes={{ root: props.classes.specificGroup }}
        />
      )}

      <Styled.RowWrapper>
        <Select
          name="bedrooms"
          label="NUMBER OF BEDROOMS"
          options={Options.bedrooms}
          labelClasses={props.classes.bedroomLabel}
          containerClasses={props.classes.bedrooms}
          shrink
        />
        <Select
          name="furnishing"
          label="FURNISHING"
          options={Options.furnishing}
          containerClasses={props.classes.furnishing}
          shrink
        />
        <Select
          name="property"
          label="TYPE OF PROPERTY"
          options={Options.property}
          containerClasses={props.classes.furnishing}
          shrink
        />
      </Styled.RowWrapper>

      <Styled.RowWrapper>
        <TextField name="notes" label="ADDITIONAL NOTES" fullWidth />
        <DatePicker
          name="date"
          label="DATE"
          className={props.classes.date}
          shouldDisableDate={day =>
            !!props.status && props.status < 1 && day.isBefore(getMinStartDate(), 'day')
          }
        />
        <TimePicker name="startTime" label="START TIME" timeFormat="h:mm A" />
      </Styled.RowWrapper>

      {!props.isEditMode && (
        <CheckBox
          name="agree"
          label={
            <div>
              <span> I agree to the </span>
              <a href={getPDFUrl('termCondition', props.common.isAndroidDevice)}>Terms and Conditions</a>
              <span> & </span>
              <a href={getPDFUrl('privacy', props.common.isAndroidDevice)}>Privacy Policy</a>
            </div>
          }
          containerClasses={props.classes.agree}
        />
      )}

      <Styled.UpdateButton
        onClick={props.handleSubmit(values => props.onSubmit(values))}
        loading={props.firstLoading}
        disabled={props.secondLoading}
      >
        {props.isEditMode ? 'Edit ' : 'Place '}Order
      </Styled.UpdateButton>
      {props.isEditMode ? (
        <Styled.UpdateButton onClick={() => pushRoute(`/home`)}>Cancel Amendment</Styled.UpdateButton>
      ) : (
        <Styled.DraftButton
          onClick={props.handleSubmit(values => props.onSubmit(values, true))}
          loading={props.secondLoading}
          disabled={props.firstLoading}
        >
          Save as Draft
        </Styled.DraftButton>
      )}
    </Styled.FormComp>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  firstLoading: PropTypes.bool,
  secondLoading: PropTypes.bool,
  orderInfo: PropTypes.object,
  isEditMode: PropTypes.bool,
  initialValues: PropTypes.object,
  classes: PropTypes.object,
  access: PropTypes.string,
  photographerToBeTaken: PropTypes.object,
  product: PropTypes.array,
  status: PropTypes.number,
  common: PropTypes.object,
};

const OrderForm = reduxForm({ form: 'Order', validate })(Form);

const selector = formValueSelector('Order');
const mapStateToProps = (state, { isEditMode }) =>
  createStructuredSelector({
    initialValues: isEditMode ? makeSelectOrder() : makeSelectOrderInfoInitialValues(),
    orderInfo: makeSelectOrderInfo(),
    common: makeSelectCommon(),
    access: _state => selector(_state, 'access'),
    photographerToBeTaken: _state => selector(_state, 'photographerToBeTaken'),
    product: _state => selector(_state, 'product'),
    status: _state => selector(_state, 'status'),
  });

export default compose(
  withStyles(Styled.styles),
  connect(mapStateToProps),
)(OrderForm);
