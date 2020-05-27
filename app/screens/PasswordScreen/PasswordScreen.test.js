import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ComponentConnect, {Password, mapDispatchToProps} from './index';

const mockStore = configureMockStore();
const initialProps = {
  login: {
    data: null,
    error: false,
    isFetching: false,
  },
  reqLogin: jest.fn(),
  route: {
    params: {
      username: 'andika9199',
    },
  },
  navigation: {
    reset: jest.fn(),
  },
};
describe('Password Screen', () => {
  describe('Password Screen rendered', () => {
    it('Screen Renderer Successfully', async () => {
      const component = renderer.create(<Password {...initialProps} />);
      expect(component).toMatchSnapshot();
    });
  });
  describe('Password Screen function', () => {
    const component = shallow(<Password {...initialProps} />);
    const instance = component.instance();

    it('setPassword', () => {
      instance.setPassword('123456');
      expect(instance.state.password).toEqual('123456');
    });
    it('login', async () => {
      await instance.login();
      expect(instance.props.reqLogin).toBeCalled();
    });
  });
  describe('Redux', () => {
    const initialState = {
      login: {
        data: {},
        error: false,
        isFetching: false,
      },
    };
    const store = mockStore(initialState);
    const component = shallow(<ComponentConnect store={store} />);

    it('mapStateToProps login should return true', () => {
      expect(component.props().login).not.toEqual({
        data: {},
        isFetching: false,
        error: false,
      });
    });
    it('mapDispatchToProps reqLogin call right type', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).reqLogin();
      expect(dispatch.mock.calls[0][0]).toEqual({
        payload: {
          username: undefined,
          password: undefined,
          isLogedIn: undefined,
        },
        type: 'REQ_LOGIN',
      });
    });
  });
});
