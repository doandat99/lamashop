import instance from "./instance";

const url = "/products";

export const get = () => instance.get(url);

export const getSingleProduct = (id) => instance.get(`${url}/${id}`);
