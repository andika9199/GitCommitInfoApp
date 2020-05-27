import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ComponentConnect, {Home, mapDispatchToProps} from './index';

const mockStore = configureMockStore();
const initialProps = {
  commitList: {
    data: null,
    error: false,
    isFetching: false,
  },
  getRepoCommitList: jest.fn(),
  route: {
    params: {
      username: 'andika9199',
    },
  },
  navigation: {
    navigate: jest.fn(),
    replace: jest.fn(),
  },
};
describe('Home Screen', () => {
  describe('Home Screen rendered', () => {
    it('Screen Renderer Successfully', async () => {
      const component = renderer.create(<Home {...initialProps} />);
      expect(component).toMatchSnapshot();
    });
  });
  describe('Home Screen function', () => {
    const component = shallow(<Home {...initialProps} />);
    const instance = component.instance();

    it('setKeyword', () => {
      instance.setKeyword('facebook/react-native');
      expect(instance.state.keyword).toEqual('facebook/react-native');
    });
    it('search', async () => {
      await instance.search();
      expect(instance.props.getRepoCommitList).toBeCalled();
    });
    it('logOut', async () => {
      await instance.logOut();
      expect(instance.props.navigation.replace).toBeCalled();
    });
  });
  describe('Redux', () => {
    const initialState = {
      commit: {
        data: {},
        error: false,
        isFetching: false,
      },
    };
    const store = mockStore(initialState);
    const component = shallow(<ComponentConnect store={store} />);

    it('mapStateToProps commitList should return true', () => {
      expect(component.props().commitList).not.toEqual({
        data: {},
        isFetching: false,
        error: false,
      });
    });
    it('mapDispatchToProps getRepoCommitList call right type', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).getRepoCommitList();
      expect(dispatch.mock.calls[0][0]).toEqual({
        payload: {
          keyword: undefined,
          page: undefined,
        },
        type: 'GET_COMMIT_LIST',
      });
    });
  });
});
