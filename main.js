import { getArticleList, getArticle, createArticle } from "./ArticleService.js";

// getArticleList(1, 10, "").then((data) => {
//   console.log(data);
// });

// getArticle(6908).then((data) => {
//   console.log(data);
// });

createArticle(
  "스프린트 미션3 테스트 게시글",
  "createArticle 테스트입니다.",
  "https://picsum.photos/300",
).then((data) => {
  console.log(data);
});
