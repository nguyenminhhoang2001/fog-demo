import AxiosClient from "./axiosClient";

export const accountApi = {
  getAllAccount(params) {
    const url = "account";
    return AxiosClient.get(url, { params });
  },
  getAccountById(id) {
    const url = `account/${id}`;
    return AxiosClient.get(url);
  },
  getAccountByPage(page) {
    const url = `account?_page=${page}&_limit=10`;
    return AxiosClient.get(url);
  },
  updatePassword(id, params) {
    const url = `account/${id}`;
    return AxiosClient.put(url, params);
  },
  updateRole(id, params) {
    const url = `account/${id}`;
    return AxiosClient.put(url, params);
  },
  deleteAccount(id) {
    const url = `account/${id}`;
    return AxiosClient.delete(url);
  },
  Login(params) {
    const url = "login/account";
    return AxiosClient.post(url, { params });
  },
  register(params) {
    const url = "register";
    return AxiosClient.post(url, params);
  },
};
