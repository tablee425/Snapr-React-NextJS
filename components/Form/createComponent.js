import { Component, createElement } from 'react';

/**
 * Creates a component class that renders the given Material UI component
 *
 * @param MaterialUIComponent The material ui component to render
 * @param mapProps A mapping of props provided by redux-form to the props the Material UI
 * component needs
 */
export default function createComponent(MaterialUIComponent, mapProps) {
  class InputComponent extends Component {
    getRenderedComponent() {
      return this.component;
    }

    render() {
      const refFunc = el => {
        this.component = el;
      };
      return createElement(MaterialUIComponent, {
        ...mapProps(this.props),
        ref: !isStateLess(MaterialUIComponent) ? refFunc : null,
      });
    }
  }
  InputComponent.displayName = `ReduxFormMaterialUI${MaterialUIComponent.name}`;
  return InputComponent;
}

const isStateLess = comp => !(comp.prototype && comp.prototype.render);
