import { Suspense } from 'react';
// Shared Components

// Client Components
import Page from '../components/page.client';
import Post from '../components/post.client';

// Utils

import Skeleton from '../components/Skeleton';

import { getPosts } from '../lib';
import { createFetchStore } from 'react-suspense-fetch';

export const postListStoreDelayed = createFetchStore(async (_key) => {
  const [res] = await Promise.all([
    getPosts(),
    new Promise((res) => setTimeout(res, 5000)),
  ]);

  return res;
});

function StoryWithData({ post }) {
  return (
    <Suspense fallback={<Skeleton count={1} />}>
      <Post post={post} />
    </Suspense>
  );
}

function NewsWithData() {
  postListStoreDelayed.prefetch('posts-delayed');

  const postData = postListStoreDelayed.get('posts-delayed');

  return (
    <>
      {postData?.data?.slice(0, 30).map((post) => {
        return <StoryWithData post={post} key={post.id} />;
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
