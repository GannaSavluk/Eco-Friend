import React, { useState } from "react";
import { Image } from "cloudinary-react";

const UploadImg = () => {
  const [imgSelected, setImgSelected] = useState();
  const [imgInfo, setImgInfo] = useState({});

  const uploadImgThunk = async () => {
    const formData = new FormData();
    formData.append("file", imgSelected);
    formData.append("upload_preset", "bh4tv9ap");

    const sendImg = await fetch(
      `https://api.cloudinary.com/v1_1/dwvm712y7/image/upload`,
      {
        method: "post",
        body: formData,
      }
    );
    const response = await sendImg.json();
    setImgInfo(response);
    console.log(response);
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setImgSelected(e.target.files[0]);
        }}
      />
      <button onClick={uploadImgThunk}>Upload image</button>
      <Image
        style={{ width: 200 }}
        cloudName="dwvm712y7"
        publicId={`https://res.cloudinary.com/dwvm712y7/image/upload/${imgInfo.version}/${imgInfo.public_id}.${imgInfo.format}`}
      />
    </div>
  );
};

export default UploadImg;
