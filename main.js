import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";
import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
} from "./ProductService.js";

// getArticleList(1, 10, "").then((data) => {
//   console.log(data);
// });

// getArticle(6957).then((data) => {
//   console.log(data);
// });

// createArticle(
//   "스프린트 미션3 테스트 게시글",
//   "createArticle 테스트입니다.",
//   "https://picsum.photos/300",
// ).then((data) => {
//   console.log(data);
// });

// patchArticle(
//   6956,
//   "스프린트 미션3 수정 제목",
//   "patchArticle 테스트입니다.",
//   "https://picsum.photos/400",
// ).then((data) => {
//   console.log(data);
// });

// deleteArticle(6957).then((data) => {
//   console.log(data);
// })

// getProductList(1, 10, '').then((data) => {
//   console.log(data);
// })

// getProduct(4279).then((data) => {
//   console.log(data);
// });

// const createdProduct = await createProduct(
//   "스프린트 미션3 테스트 상품",
//   "createProduct 테스트입니다.",
//   15000,
//   ["테스트", "미션3"],
//   ["https://picsum.photos/300"],
// );

// console.log(createdProduct);

// const patchedProduct = await patchProduct(
//   4305,
//   "스프린트 미션3 수정 상품",
//   "patchProduct 테스트입니다.",
//   20000,
//   ["수정", "미션3"],
//   ["https://picsum.photos/400"],
// );

// console.log(patchedProduct);

// const result = await deleteProduct(4306);

// console.log(result);
