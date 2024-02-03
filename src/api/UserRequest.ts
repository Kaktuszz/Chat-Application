import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");

  if (profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile)}`;
  }

  return req;
});

export const getUser = (userId: any) => API.get(`/user/${userId}`);

export const updateUser = (id: any, formData: any) =>
  API.put(`/user/${id}`, formData);

export const getAllUser = () => API.get(`/user`);
