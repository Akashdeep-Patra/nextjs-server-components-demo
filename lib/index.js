// Implementation code where T is the returned data shape
export const apiInstance = {
  get: async (url, delay = 1000) => {
    const [response] = await Promise.all([
      fetch(url, {
        headers: {
          'app-id': process.env.NEXT_PUBLIC_APP_ID,
        },
      }),
      new Promise((res) => setTimeout(res, delay)),
    ]);

    return response.json();
  },
};

export const getPosts = async ({ limit = 20, page = 0 } = {}) => {
  return await apiInstance.get(
    `https://dummyapi.io/data/v1/post?limit=${limit}&page=${page}`
  );
};

export const getPostDataById = (id) =>
  apiInstance.get(`https://dummyapi.io/data/v1/post/${id}`);

// export const postListStore = createFetchStore(async (_key) => {
//   return await getPosts();
// });
// export const postDataStore = createFetchStore(async (id) => {
//   return await getPostDataById(id);
// });

// export const postListStoreDelayed = createFetchStore(async (_key) => {
//   const [res] = await Promise.all([
//     getPosts(),
//     new Promise((res) => setTimeout(res, 5000)),
//   ]);

//   return res;
// });
