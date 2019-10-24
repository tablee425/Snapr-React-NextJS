import React from 'react';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';

import { AppLayout } from '~/components';
import { ContactForm } from './Components';
import { AuthRequest } from '~/utils/services';
import { openAlertDialog } from '~/utils/redux/actions';
import { pushRoute } from '~/utils/utils';

const Contact = ({ dispatch }) => {
  const onContact = values => {
    if (!values.recaptcha) {
      throw new SubmissionError({ recaptcha: 'Captcha is not checked' });
    }

    return AuthRequest.requestContact(values)
      .then(() => {
        dispatch(
          openAlertDialog({
            description: 'Your request has been submitted successfully!',
            noAction: () => {
              pushRoute('/');
            },
          }),
        );
      })
      .catch(err => {
        throw new SubmissionError({ _error: err.message });
      });
  };

  return (
    <AppLayout noHeader withForm formTopMargin={70}>
      <ContactForm onSubmit={onContact} />
    </AppLayout>
  );
};

Contact.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(Contact);
