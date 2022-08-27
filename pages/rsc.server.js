import { Suspense } from 'react';
// Shared Components

// Client Components
import Page from '../components/page.client';
import Post from '../components/post.client';

import { postDataStore, postListStore } from '../lib/index';
import Skeleton from '../components/Skeleton';

function StoryWithData({ id }) {
  postDataStore.prefetch(id);
  const post = postDataStore.get(id);
  return (
    <Suspense fallback={<Skeleton count={1} />}>
      <Post post={post} />
    </Suspense>
  );
}

function NewsWithData() {
  postListStore.prefetch('posts');

  const postData = postListStore.get('posts');

  return (
    <>
      {postData?.data?.slice(0, 30).map((post) => {
        return <StoryWithData id={post.id} key={post.id} />;
      })}
    </>
  );
}

export default function News() {
  return (
    <Page>
      <Suspense fallback={<Skeleton />}>
        <NewsWithData />
      </Suspense>
    </Page>
  );
}

export const config = {
  runtime: 'experimental-edge',
};
