import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ComponentConnect, {Commit, mapDispatchToProps} from './index';

const mockStore = configureMockStore();
const initialProps = {
  commitList: {
    data: [
      {
        commit: {
          message: 'Always return an EventDispatcher in bridgeless mode...',
          committer: {
            date: '2020-05-27T19:16:21Z',
          },
        },
        author: {
          login: 'ejanzer',
          avatar_url: 'https://avatars1.githubusercontent.com/u/2308395?v=4',
        },
        committer: {
          login: 'facebook-bot',
          avatar_url: 'https://avatars3.githubusercontent.com/u/6422482?v=4',
        },
      },
      {
        commit: {
          message: 'Always return an EventDispatcher in bridgeless mode...',
          committer: {
            date: '2020-05-27T19:16:21Z',
          },
        },
        author: {
          login: 'charles',
          avatar_url: 'https://avatars1.githubusercontent.com/u/2308395?v=4',
        },
        committer: {
          login: 'facebook-bot',
          avatar_url: 'https://avatars3.githubusercontent.com/u/6422482?v=4',
        },
      },
    ],
    error: false,
    isFetching: false,
  },
  getRepoCommitList: jest.fn(),
  route: {
    params: {
      repo: 'facebook-react-native',
    },
  },
  navigation: {
    reset: jest.fn(),
  },
};

describe('Commit Screen', () => {
  describe('Commit Screen rendered', () => {
    it('Screen Renderer Successfully', async () => {
      const component = renderer.create(<Commit {...initialProps} />);
      expect(component).toMatchSnapshot();
    });
  });
  describe('Commit Screen function', () => {
    const component = shallow(<Commit {...initialProps} />);
    const instance = component.instance();

    it('newerCommit', async () => {
      instance.setState({
        page: 1,
      });
      await instance.newerCommit();
      expect(instance.props.getRepoCommitList).toBeCalled();
      expect(instance.state.page).toBe(0);
    });
    it('olderCommit', async () => {
      instance.setState({
        page: 1,
      });
      await instance.olderCommit();
      expect(instance.props.getRepoCommitList).toBeCalled();
      expect(instance.state.page).toBe(2);
    });
    it('logOut', async () => {
      await instance.logOut();
      expect(instance.props.navigation.reset).toBeCalled();
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
