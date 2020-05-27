import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ComponentConnect, {SplashScreen, mapDispatchToProps} from './index';
import {getToken} from '../../configs/apiconfig';

const mockStore = configureMockStore();

jest.mock('../../configs/apiconfig', () => ({
  getToken: jest.fn(),
}));

const initialProps = {
  login: {
    data: null,
    error: false,
    isFetching: false,
  },
  reqLogin: jest.fn(),
  navigation: {
    replace: jest.fn(),
  },
};
describe('Splash Screen', () => {
  describe('Splash Screen rendered', () => {
    it('Screen Renderer Successfully user not Login', async () => {
      await getToken.mockImplementationOnce(() => {
        return null;
      });
      const component = renderer.create(<SplashScreen {...initialProps} />);
      expect(component).toMatchSnapshot();
    });
    it('Screen Renderer Successfully user Login', async () => {
      await getToken.mockImplementationOnce(() => {
        return 'Basic ynwadwadsue==';
      });
      const component = renderer.create(<SplashScreen {...initialProps} />);
      expect(component).toMatchSnapshot();
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
