import instance from "./instance";

const url = "/categories";

export const get = () => instance.get(url + "?_embed=products");

export const add = (category) => instance.post(url, category);

export const remove = (id) => instance.delete(`${url}/${id}`);

export const update = (id, data) => instance.put(`${url}/${id}`, data);
