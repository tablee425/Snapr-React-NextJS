import React from 'react';
import App, { Container } from 'next/app';
import { MuiThemeProvider } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import CssBaseline from '@material-ui/core/CssBaseline';
import io from 'socket.io-client';

import createStore from '~/utils/redux/store';
import getPageContext from '~/utils/getPageContext';

import StartUp from './StartUp';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
    this.state = { socket: null };
  }

  pageContext = null;

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    const socket = io(process.env.SOCKET_HOST, { transports: ['websocket'] });

    this.setState({ socket });
  }

  componentWillUnmount() {
    this.state.socket.close();
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          {/* Wrap every page in Jss and Theme providers */}
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            {/* MuiThemeProvider makes the theme available down the React
                tree thanks to React context. */}
            <MuiThemeProvider theme={this.pageContext.theme} sheetsManager={this.pageContext.sheetsManager}>
              {/* Pass pageContext to the _document though the renderPage enhancer
                  to render collected styles on server side. */}
              <CssBaseline />
              <StartUp>
                <Component pageContext={this.pageContext} {...pageProps} socket={this.state.socket} />
              </StartUp>
            </MuiThemeProvider>
          </JssProvider>
        </Provider>
      </Container>
    );
  }
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({ ctx });
  }

  return { pageProps };
};

export default withRedux(createStore)(withReduxSaga({ async: false })(MyApp));
