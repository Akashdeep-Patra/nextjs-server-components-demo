import { Suspense } from 'react';
// Shared Components

// Server Components
import SystemInfo from '../components/server-info.server';

// Client Components
import Page from '../components/page.client';
import Footer from '../components/footer.client';
import Post from '../components/post.client';

// Utils

import { postListStoreDelayed } from '../lib/index';
import Skeleton from '../components/Skeleton';

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
      <Footer />
      <SystemInfo />
    </Page>
  );
}

export const config = {
  runtime: 'experimental-edge',
};
