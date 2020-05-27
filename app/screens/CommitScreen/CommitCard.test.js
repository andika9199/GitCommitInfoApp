import React from 'react';
import renderer from 'react-test-renderer';
import CommitCard from './CommitCard';

const mockProps = {
  message: 'Always return an EventDispatcher in bridgeless mode...',
  date: '2020-05-27T19:16:21Z',
  authorAvatar: 'https://avatars1.githubusercontent.com/u/2308395?v=4',
  authorName: 'ejanzer',
  commiterAvatar: 'https://avatars3.githubusercontent.com/u/6422482?v=4',
  commiterName: 'facebook-github-bot',
  index: 1,
};

const mockNoAuthor = {
  message: 'Always return an EventDispatcher in bridgeless mode...',
  date: '2020-05-27T19:16:21Z',
  authorAvatar: '',
  authorName: '',
  commiterAvatar: 'https://avatars3.githubusercontent.com/u/6422482?v=4',
  commiterName: 'facebook-github-bot',
  index: 2,
};

it('CommitCard successfully rendered with data', () => {
  const component = renderer.create(<CommitCard props={mockProps} />);
  expect(component).toMatchSnapshot();
});

it('CommitCard successfully rendered without Author data', () => {
  const component = renderer.create(<CommitCard props={mockNoAuthor} />);
  expect(component).toMatchSnapshot();
});
