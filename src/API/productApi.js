import AxiosClient from "./axiosClient";

export const ProductApi = {
  getAllProduct(params) {
    const url = "product";
    return AxiosClient.get(url, { params });
  },
  getProductByPage(page) {
    const url = `product?_page=${page}&_limit=10`;
    return AxiosClient.get(url);
  },
  getByPage(page) {
    const url = `product?_page=${page}&_limit=8`;
    return AxiosClient.get(url);
  },
  getByPageMobile(page) {
    const url = `product?_page=${page}&_limit=4`;
    return AxiosClient.get(url);
  },
  getProductById(id) {
    const url = `product/${id}`;
    return AxiosClient.get(url);
  },
  deleteProduct(id) {
    const url = `product/${id}`;
    return AxiosClient.delete(url);
  },
  editProduct() {},
  updateProduct(id, params) {
    const url = `product/${id}`;
    return AxiosClient.put(url, params);
  },
  AddProduct(params) {
    const url = "product";
    return AxiosClient.post(url, params);
  },
};
