import { Suspense } from 'react';
// Shared Components

// Server Components
import SystemInfo from '../components/server-info.server';

// Client Components
import Page from '../components/page.client.js';
import Footer from '../components/footer.client.js';
import ErrorPlaceholder from '../components/error-placeholder.client.js';
import Post from '../components/post.client.js';

// Utils

import { postDataStore, postListStoreDelayed } from '../lib/index';
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
  postListStoreDelayed.prefetch('posts-delayed');

  const postData = postListStoreDelayed.get('posts-delayed');

  return (
    <>
      {!postData ? <ErrorPlaceholder error={error} /> : null}
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
      <Footer />
      <SystemInfo />
    </Page>
  );
}