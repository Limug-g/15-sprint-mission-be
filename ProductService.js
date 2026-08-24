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

export async function createProduct(name, description, price, tags, images) {
  const url = `${BASE_URL}/products`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, price, tags, images }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function patchProduct(
  productId,
  name,
  description,
  price,
  tags,
  images,
) {
  const url = `${BASE_URL}/products/${productId}`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function deleteProduct(productId) {
  const url = `${BASE_URL}/products/${productId}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
}
