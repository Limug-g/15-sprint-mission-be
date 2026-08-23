const BASE_URL = "https://panda-market-api-crud.vercel.app";

export function getArticleList(page, pageSize, keyword) {
  const url = `${BASE_URL}/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;

  return fetch(url)
    .then((response) => {
      if(!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      return response.json()
    })
    .catch((error) => {
      console.error(error.message);
    });
}
