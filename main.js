import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
} from "./ArticleService.js";

// getArticleList(1, 10, "").then((data) => {
//   console.log(data);
// });

// getArticle(6908).then((data) => {
//   console.log(data);
// });

// createArticle(
//   "스프린트 미션3 테스트 게시글",
//   "createArticle 테스트입니다.",
//   "https://picsum.photos/300",
// ).then((data) => {
//   console.log(data);
// });

patchArticle(
  6956,
  "스프린트 미션3 수정 제목",
  "patchArticle 테스트입니다.",
  "https://picsum.photos/400",
).then((data) => {
  console.log(data);
});
