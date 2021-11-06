import React from "react";
import Image from "next/image";

const ImageBlock = ({ image }) => {

  return (
    <div>
      <img style={{ width: 300 }} src={image?.file.url} alt="image" />
    </div>
  );
};

export default ImageBlock;
