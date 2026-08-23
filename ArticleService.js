const BASE_URL = "https://panda-market-api-crud.vercel.app";

export function getArticleList(page, pageSize, keyword) {
  const url = `${BASE_URL}/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      return response.json();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

export function getArticle(articleId) {
  return fetch(`${BASE_URL}/articles/${articleId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: $(response.status}`);
      }

      return response.json();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

export function createArticle(title, content, image) {
  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      image,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      return response.json();
    })
    .catch((error) => {
      console.error(error.message);
    });
}
