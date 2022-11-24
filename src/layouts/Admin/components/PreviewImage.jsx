import React, { useState } from "react";

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState({});
  if (file) {
    const render = new FileReader();
    render.readAsDataURL(file);
    render.onload = () => {
      setPreview(render.result);
    };
  }

  return (
    <div>
      <img style={{ width: "50px" }} src={preview} alt="" />
    </div>
  );
};

export default PreviewImage;
