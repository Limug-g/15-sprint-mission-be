import { getArticleList, getArticle } from "./ArticleService.js";

getArticleList(1, 10, "").then((data) => {
  console.log(data);
});

getArticle(6908).then((data) => {
  console.log(data);
});
