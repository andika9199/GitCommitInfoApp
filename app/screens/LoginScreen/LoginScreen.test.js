import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import LoginScreen from './index';

describe('Login Screen', () => {
  describe('Login Screen rendered', () => {
    it('Screen Renderer Successfully', async () => {
      const component = renderer.create(<LoginScreen />);
      expect(component).toMatchSnapshot();
    });
  });
  describe('Login Screen function', () => {
    const props = {
      navigation: {
        navigate: jest.fn(),
      },
    };
    const component = shallow(<LoginScreen {...props} />);
    const instance = component.instance();

    it('setUsername', () => {
      instance.setUsername('andika9199');
      expect(instance.state.username).toEqual('andika9199');
    });
    it('goToPasswordScreen', () => {
      instance.goToPasswordScreen();
      expect(instance.props.navigation.navigate).toBeCalled();
    });
  });
});
