import AxiosClient from "./axiosClient";

export const accountApi = {
  getAllAccount(params) {
    const url = "users";
    return AxiosClient.get(url, { params });
  },
  getAccountById(id) {
    const url = `users/${id}`;
    return AxiosClient.get(url);
  },
  getAccountByPage(page) {
    const url = `users?_page=${page}&_limit=10`;
    return AxiosClient.get(url);
  },
  updatePassword(id, params) {
    const url = `users/${id}`;
    return AxiosClient.put(url, params);
  },
  updateRole(id, params) {
    const url = `users/${id}`;
    return AxiosClient.put(url, params);
  },
  deleteAccount(id) {
    const url = `users/${id}`;
    return AxiosClient.delete(url);
  },
  Login({ email, password }) {
    const url = "login";
    return AxiosClient.post(url, { email, password });
  },
  register(params) {
    const url = "register";
    return AxiosClient.post(url, params);
  },
};
