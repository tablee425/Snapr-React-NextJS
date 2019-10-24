import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import Colors from '~/utils/colors';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: Colors.green,
    },
  },
  typography: {
    fontFamily: "'CustomSkia', 'Skia'",
  },
  overrides: {
    MuiDialog: {
      paper: {
        '@media (max-width: 575px)': {
          margin: 10,
        },
      },
    },
    MuiDialogContentText: {
      root: {
        color: 'black',
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: Colors.primaryColor,
      },
    },
    MuiPickersToolbarButton: {
      toolbarBtn: {
        color: 'rgba(0,0,0,.3)',
      },
      toolbarBtnSelected: {
        color: '#000',
      },
    },
    MuiPickersDay: {
      selected: {
        backgroundColor: Colors.primaryColor,
        color: '#000',
        'body.hasHover &:hover': {
          backgroundColor: Colors.primaryColor,
        },
      },
    },
    MuiPickersClockNumber: {
      selected: {
        backgroundColor: Colors.primaryColor,
        color: '#000',
      },
    },
    MuiPickersClockPointer: {
      thumb: {
        border: `14px solid ${Colors.primaryColor}`,
        backgroundColor: '#000',
      },
      pointer: {
        backgroundColor: Colors.primaryColor,
      },
    },
    MuiPickersClock: {
      pin: {
        backgroundColor: Colors.primaryColor,
      },
    },
    MuiAvatar: {
      root: {
        width: 77,
        height: 74,
      },
      colorDefault: {
        backgroundColor: 'white',
        border: '1px solid #979797',
      },
    },
  },
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
