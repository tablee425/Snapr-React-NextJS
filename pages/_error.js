import React from 'react';

import { AppLayout, DivColumn } from '~/components';

export default class Error extends React.Component {
  static getInitialProps({ res, err, ctx }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <AppLayout noFooter noHeader>
        <DivColumn style={{ alignItmes: 'center', justifyContent: 'center', padding: '0 10px' }}>
          <h1 style={{ textAlign: 'center' }}>404 | This page could not be found.</h1>
        </DivColumn>
      </AppLayout>
    );
  }
}
