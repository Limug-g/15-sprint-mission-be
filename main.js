import { getArticleList } from "./ArticleService.js";

getArticleList(1, 10, "").then((data) => {
  console.log(data);
});
