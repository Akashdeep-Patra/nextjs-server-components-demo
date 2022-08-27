import { Suspense, useEffect, useState } from 'react';
//client
import Page from '../components/page.client';
import Post from '../components/post.client';

//mixed
import Skeleton from '../components/Skeleton';

import { getPostDataById, getPosts } from '../lib';
import useData from '../lib/use-data';

function PostWithData({ id }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useData(`s-${id}`, async () => await getPostDataById(id));
  if (typeof window === 'undefined' || !data) return <Skeleton count={1} />;

  return <Post post={data} />;
}

function PageWithData() {
  const { data: posts } = useData(
    'stories',
    async () => (await getPosts()).data
  );
  return (
    <>
      {posts?.slice(0, 30).map((post) => {
        return (
          <Suspense key={post.id} fallback={<Skeleton count={1} />}>
            <PostWithData id={post.id} />
          </Suspense>
        );
      })}
    </>
  );
}

export default function News() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Page>
      {mounted ? (
        <Suspense fallback={<Skeleton />}>
          <PageWithData />
        </Suspense>
      ) : (
        <Skeleton />
      )}
    </Page>
  );
}
