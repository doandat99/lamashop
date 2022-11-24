import axios from "axios";

const uploadImage = async (file) => {
  const API_URL = process.env.REACT_APP_CLOUDINARY_URL;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "xy7d7tg3");
  const { data } = await axios.post(API_URL, formData);

  return data.url;
};

export default uploadImage;
