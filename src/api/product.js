import instance from "./instance";

const url = "/products";

export const get = () => instance.get(url);

export const getSingleProduct = (id) => instance.get(`${url}/${id}`);

export const post = (data) => instance.post(url, data);

export const remove = (id) => instance.delete(`${url}/${id}`);

export const update = (id, data) => instance.put(`${url}/${id}`, data);
