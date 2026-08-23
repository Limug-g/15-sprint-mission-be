const BASE_URL = "https://panda-market-api-crud.vercel.app";

export async function getProductList(page, pageSize, keyword) {
  const url = `${BASE_URL}/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getProduct(productId) {
  const url = `${BASE_URL}/products/${productId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
}
