import Page from '../components/page.client.js';
import { getPostDataById, getPosts } from '../lib/index';
import Post from '../components/post.client.js';

export const getServerSideProps = async () => {
  const posts = await (await getPosts()).data;
  const data = await Promise.all(
    posts.slice(0, 30).map((post) => getPostDataById(post.id))
  );

  return {
    props: {
      data,
    },
  };
};

export default function News({ data }) {
  return (
    <Page>
      {data.map((post, i) => {
        return <Post key={i} post={post} />;
      })}
    </Page>
  );
}
