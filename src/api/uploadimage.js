import axios from "axios";

const uploadImage = async (file) => {
  const API_URL = "https://api.cloudinary.com/v1_1/dat09/image/upload";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "doandat");
  const { data } = await axios.post(API_URL, formData);

  return data.url;
};

export default uploadImage;
